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
import {displayValidationErrors, flashHasError, hasErr} from "../../helpers/errorHandlers";
import ReturnSellInvServices from "../../services/invoices/ReturnSellInvServices";
import ReturnSellingInvoiceOperations, { InvoiceItem } from "../invoice_manager/ReturnSellingInvoiceOperations";
import NoInvoiceOperations from "../invoice_manager/NoInvoiceOperations";

interface SellingInvoice {
    id: number;
    total_cash: number;
    selling_invoice_items: SellingInvoiceItem[];
    return_selling_invoices: ReturnSellingInvoice[];
}
interface ReturnSellingInvoice {
    id: number;
    selling_invoice_id: number;
    total_cost: number;
    items: ReturnSellingInvoiceItem[];
}
interface ReturnSellingInvoiceItem {
    id: number;
    return_selling_invoice_id: number;
    product_id: number;
    quantity: number;
    return_price: number;
}
interface SellingInvoiceItem {
    id: number;
    selling_invoice_id: number;
    stock_item_id: number;
    quantity: number;
    selling_price: number;
    stock_item: {
        id: number;
        quantity: number;
        stock_id: number;
        box_id: number;
        box: {
            id: number;
            product_id: number;
            buying_price: number;
            product: {
                id: number;
                name: string;
                barcode: string;
            };
        };
    };
}
type SubmitedData = {}[];
interface ReturnSellingInvoiceItemFactory
    extends Factoring<SellingInvoice, InvoiceItem[]> {}

export default class CreateReturnSellingInvoiceManager
    extends CreateInvoiceManager<
        SearchParams,
        SellingInvoice,
        InvoiceItem[],
        SubmitedData,
        InvoiceItem
    >
{
    private afterSearch(invoiceItems: InvoiceItem[], sellingInvoiceId: number) {
        this.props.setInvoiceItems(invoiceItems);
        this.props.setAdditionalData({ sellingInvoiceId });
        this.props.search.changeSearchValue("");
    }
    public search: Search;
    public submit: Submit;
    public invoiceOperations: NoInvoiceOperations;
    public returnInvoiceOperations: ReturnSellingInvoiceOperations;
    constructor(public props: ReturnInvoiceOperationPropsStates<InvoiceItem>) {
        super();
        this.invoiceOperations = new NoInvoiceOperations(null);
        this.returnInvoiceOperations = new ReturnSellingInvoiceOperations(props);
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
class Search
    implements Searching<SearchParams, SellingInvoice, InvoiceItem[], number>
{
    constructor(
        public readonly searchParams: SearchParams,
        public readonly afterSearch: (
            invoiceItems: InvoiceItem[],
            sellingInvoiceId: number
        ) => void
    ) {
        this.onSearch = this.onSearch.bind(this);
        this.factory = new Factory();
    }
    public factory: ReturnSellingInvoiceItemFactory;
    public onSearch() {
        Inertia.reload({
            data: this.searchParams,
            only: ["selling_invoice"],
            preserveState: true,
            onSuccess: (page) => {
                const sellingInvoice = page.props
                    .selling_invoice as SellingInvoice | null;
                if (sellingInvoice === null)
                    return message.error("لا يوجد فاتورة شراء بهذا الرقم");
                const invoiceItems = this.factory.factory(sellingInvoice);
                this.afterSearch(invoiceItems, sellingInvoice.id);
            },
        });
    }
}

class Factory implements ReturnSellingInvoiceItemFactory {
    private processInvoice(sellingInvoice: SellingInvoice) {
        const sellingInvoiceItemsByProductId = this.mergeSellingInvoiceItems(
            sellingInvoice.selling_invoice_items
        );

        const previousReturnedItems = sellingInvoice.return_selling_invoices
            .map((inv) => inv.items)
            .flat();

        const itemsWithAvailableQuantities =
            this.calculateAvailableReturnQuantities(
                sellingInvoiceItemsByProductId,
                previousReturnedItems
            );

        return itemsWithAvailableQuantities;
    }
    private mergeSellingInvoiceItems(items: SellingInvoiceItem[]) {
        const map = new Map<number, SellingInvoiceItem>();
        items.forEach((item) => {
            const {
                stock_item: {
                    box: { product_id },
                },
                quantity,
            } = item;
            const existingItem = map.get(product_id);
            if (existingItem) existingItem.quantity += quantity;
            else map.set(product_id, { ...item, quantity });
        });
        return Array.from(map.values());
    }

    private calculateAvailableReturnQuantities(
        sellingItems: SellingInvoiceItem[],
        returnItems: ReturnSellingInvoiceItem[]
    ) {
        const map = new Map<number, SellingInvoiceItem>();
        sellingItems.forEach((item) => {
            map.set(item.stock_item.box.product_id, item);
        });

        returnItems.forEach((returnItem) => {
            const item = map.get(returnItem.product_id);
            if (item) {
                item.quantity -= returnItem.quantity;
                map.set(returnItem.product_id, item);
            }
        });
        return Array.from(map.values());
    }

    public factory(sellingInvoice: SellingInvoice): InvoiceItem[] {
        return this.processInvoice(sellingInvoice).map((item) => ({
            key: item.stock_item.id.toString(),
            id: item.stock_item.id,
            product_id: item.stock_item.box.product_id,
            available_quantity: item.quantity,
            return_quantity: 0,
            name: item.stock_item.box.product.name,
            barcode: item.stock_item.box.product.barcode,
            selling_price: item.selling_price,
            return_price: item.selling_price,
            total: 0,
        }));
    }
}

class Submit implements Submiting<SubmitedData> {
    constructor(public props: ReturnInvoiceOperationPropsStates<InvoiceItem>) {
        this.onSubmit = this.onSubmit.bind(this);
    }
    public remapItemsToSubmit() {
        return this.props.invoiceItems.map((item) => ({
            stock_item_id: item.id,
            product_id: item.product_id,
            quantity: item.return_quantity,
            return_price: item.return_price,
            total: item.total,
        }));
    }

    public onSubmit() {
        this.props.setLoading(true);
        console.log(this.props);
        Inertia.post(
            ReturnSellInvServices.storeURL(),
            {
                invoiceItems: this.remapItemsToSubmit() as any,
                selling_invoice_id: this.props.additionalData.sellingInvoiceId,
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
