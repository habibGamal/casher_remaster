import { Inertia } from "@inertiajs/inertia";
import CreateInvoiceManager, {
    BaseInvoiceItem,
    Factoring,
    Searching,
    Submiting,
    ReturnInvoiceOperations,
    ReturnInvoiceOperationPropsStates,
} from "./CreateInvoiceManager";
import { message } from "antd";
import ReturnBuyInvServices from "../../services/invoices/ReturnBuyInvServices";

interface InvoiceItem extends BaseInvoiceItem {
    id: number;
    key: string;
    product_id: number;
    available_quantity: number;
    return_quantity: number;
    name: string;
    barcode: string;
    buying_price: number;
    return_price: number;
    stock: string;
    stock_item_id: number;
    children: ChildInvoiceItem[];
    total: number;
}
interface ChildInvoiceItem {
    id: number;
    key: string;
    stock: string;
    stock_item_id: number;
    available_quantity: number;
    return_quantity: number;
}

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

export default class CreateReturnBuyingInvoiceManager
    extends CreateInvoiceManager<
        SearchParams,
        BuyingInvoice,
        InvoiceItem[],
        SubmitedData
    >
    implements ReturnInvoiceOperations<InvoiceItem>
{
    private afterSearch(invoiceItems: InvoiceItem[], buyingInvoiceId: number) {
        this.props.setInvoiceItems(invoiceItems);
        this.props.setAdditionalData({ buyingInvoiceId });
        this.props.search.changeSearchValue("");
    }

    private isReturnQuantityValid(invoiceItem: InvoiceItem) {
        const isValid =
            invoiceItem.return_quantity <= invoiceItem.available_quantity;
        if (!isValid) message.error("الكمية المرتجعة أكبر من الكمية المتاحة");
        return isValid;
    }

    private correctTotal(invoiceItem: InvoiceItem) {
        invoiceItem.return_quantity = invoiceItem.children.reduce(
            (total, child) =>
                total + parseFloat(child.return_quantity.toString()),
            0
        );
        invoiceItem.total = parseFloat(
            (invoiceItem.return_quantity * invoiceItem.return_price).toFixed(2)
        );
        return invoiceItem;
    }

    public search: Search;
    public submit: Submit;
    constructor(public props: ReturnInvoiceOperationPropsStates<InvoiceItem>) {
        super();
        this.edit = this.edit.bind(this);
        this.cancelOperation = this.cancelOperation.bind(this);
        this.getInvoiceItems = this.getInvoiceItems.bind(this);
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

    public getInvoiceItems() {
        return this.props.invoiceItems;
    }

    public edit(invoiceItem: InvoiceItem) {
        const invoiceItems = this.props.invoiceItems.map((item) => {
            const itemMatch = item.id == invoiceItem.id;
            if (!itemMatch) return item;
            if (!this.isReturnQuantityValid(invoiceItem)) return item;
            item.children = item.children.map((childItem) => {
                if (childItem.key != invoiceItem.key) return childItem;
                return invoiceItem;
            });
            return this.correctTotal(item);
        });
        this.props.setInvoiceItems(invoiceItems);
    }

    public cancelOperation() {
        this.props.setInvoiceItems([]);
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
                    if (!(page.props.flash as any).error) {
                        this.props.setInvoiceItems([]);
                    }
                },
            }
        );
    }
}
