import { Inertia } from "@inertiajs/inertia";
import CreateInvoiceManager, {
    BaseInvoiceItem,
    Factoring,
    Searching,
    Submiting,
    ReturnInvoiceOperations,
    ReturnInvoiceOperationPropsStates,
} from "../invoice_manager/CreateInvoiceManager";
import { message } from "antd";
import ReturnBuyInvServices from "../../services/invoices/ReturnBuyInvServices";
import ReturnBuyingInvoiceOperations, {
    InvoiceItem,
} from "../invoice_manager/ReturnBuyingInvoiceOperations";
import NoInvoiceOperations from "../invoice_manager/NoInvoiceOperations";
import { displayValidationErrors, flashHasError } from "../../helpers/errorHandlers";

interface BuyingInvoice {
    id: number;
    total_cost: number;
    buying_invoice_items: BuyingInvoiceItem[];
}

interface BuyingInvoiceItem {
    id: number;
    buying_invoice_id: number;
    box_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    box: {
        id: number;
        product_id: number;
        buying_price: number;
        stock_items: {
            id: number;
            quantity: number;
            stock_id: number;
            box_id: number;
            stock: {
                id: number;
                name: string;
            };
        }[];
        product: {
            id: number;
            name: string;
            barcode: string;
        };
    };
}

type SubmitedData = {}[];
interface ReturnBuyingInvoiceItemFactory
    extends Factoring<BuyingInvoice, InvoiceItem[]> {}

export default class CreateReturnBuyingInvoiceManager extends CreateInvoiceManager<
    SearchParams,
    BuyingInvoice,
    InvoiceItem[],
    SubmitedData,
    InvoiceItem
> {
    private afterSearch(invoiceItems: InvoiceItem[], buyingInvoiceId: number) {
        this.props.setInvoiceItems(invoiceItems);
        this.props.setAdditionalData({ buyingInvoiceId });
        this.props.search.changeSearchValue("");
    }

    public search: Search;
    public submit: Submit;
    public invoiceOperations: NoInvoiceOperations;
    public returnInvoiceOperations: ReturnBuyingInvoiceOperations;
    constructor(public props: ReturnInvoiceOperationPropsStates<InvoiceItem>) {
        super();
        this.invoiceOperations = new NoInvoiceOperations(null);
        this.returnInvoiceOperations = new ReturnBuyingInvoiceOperations(props);
        this.afterSearch = this.afterSearch.bind(this);
        this.search = new Search(
            {
                attribute: this.props.search.data.attribute,
                value: this.props.search.data.value,
            },
            this.afterSearch
        );
        this.submit = new Submit(this.props);
    }
}

type SearchParams = {
    attribute: string;
    value: string;
};
class Search implements Searching<SearchParams, BuyingInvoice, InvoiceItem[]> {
    constructor(
        public readonly searchParams: SearchParams,
        public readonly afterSearch: (
            invoiceItems: InvoiceItem[],
            buyingInvoiceId: number
        ) => void
    ) {
        this.onSearch = this.onSearch.bind(this);
        this.factory = new Factory();
    }
    public factory: ReturnBuyingInvoiceItemFactory;
    public onSearch() {
        Inertia.reload({
            data: this.searchParams,
            only: ["buying_invoice"],
            preserveState: true,
            onSuccess: (page) => {
                const buyingInvoice = page.props
                    .buying_invoice as BuyingInvoice | null;
                if (buyingInvoice === null)
                    return message.error("لا يوجد فاتورة شراء بهذا الرقم");
                const invoiceItems = this.factory.factory(buyingInvoice);
                this.afterSearch(invoiceItems, buyingInvoice.id);
            },
        });
    }
}

class Factory implements ReturnBuyingInvoiceItemFactory {
    public factory(buyingInvoice: BuyingInvoice): InvoiceItem[] {
        return buyingInvoice.buying_invoice_items.map((buyingInvoiceItem) => ({
            id: buyingInvoiceItem.id,
            key: buyingInvoiceItem.id.toString(),
            product_id: buyingInvoiceItem.box.product.id,
            available_quantity: buyingInvoiceItem.box.stock_items.reduce(
                (total, stock_item) => total + stock_item.quantity,
                0
            ),
            return_quantity: 0,
            name: buyingInvoiceItem.box.product.name,
            barcode: buyingInvoiceItem.box.product.barcode,
            buying_price: buyingInvoiceItem.box.buying_price,
            return_price: buyingInvoiceItem.box.buying_price,
            stock: "-", // redundant
            stock_item_id: 0, // redundant
            children: buyingInvoiceItem.box.stock_items.map(
                (stock_item, index) => {
                    return {
                        id: buyingInvoiceItem.id,
                        key: `${index}-${buyingInvoiceItem.box.product.barcode}`,
                        stock_item_id: stock_item.id,
                        available_quantity: stock_item.quantity,
                        return_quantity: 0,
                        stock: stock_item.stock.name,
                    };
                }
            ),
            total: 0,
        }));
    }
}

class Submit implements Submiting<SubmitedData> {
    constructor(public props: ReturnInvoiceOperationPropsStates<InvoiceItem>) {
        this.onSubmit = this.onSubmit.bind(this);
    }

    public remapItemsToSubmit() {
        const submitedData: any[] = [];
        this.props.invoiceItems.forEach((item) =>
            item.children.forEach((child) => {
                submitedData.push({
                    product_id: item.product_id,
                    stock_item_id: child.stock_item_id,
                    quantity: child.return_quantity,
                    return_price: item.return_price,
                });
            })
        );
        return submitedData;
    }

    public onSubmit() {
        this.props.setLoading(true);
        Inertia.post(
            ReturnBuyInvServices.storeURL(),
            {
                invoiceItems: this.remapItemsToSubmit() as any,
                buying_invoice_id: this.props.additionalData.buyingInvoiceId,
            },
            {
                onSuccess: (page) => {
                    this.props.setLoading(false);
                    if (!flashHasError(page)) {
                        this.props.setInvoiceItems([]);
                    }
                },
                onError: (errors)=>{
                    this.props.setLoading(false);
                    displayValidationErrors(errors)
                }
            }
        );
    }
}
