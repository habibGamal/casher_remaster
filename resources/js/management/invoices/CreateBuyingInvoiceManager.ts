import { Inertia } from "@inertiajs/inertia";
import CreateInvoiceManager, {
    BaseInvoiceItem,
    InvoiceOperations,
    Factoring,
    InvoiceOperationPropsStates,
    Searching,
    Submiting,
} from "./CreateInvoiceManager";
import { message } from "antd";
import BuyInvServices from "../../services/invoices/BuyInvServices";

interface Product {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
}
interface InvoiceItem extends BaseInvoiceItem {
    product_id: number;
    quantity: number;
    name: string;
    barcode: string;
    price: number;
}
type SubmitedData = {}[];
interface BuyingInvoiceItemFactory extends Factoring<Product, InvoiceItem> {}

export default class CreateBuyingInvoiceManager
    extends CreateInvoiceManager<
        SearchParams,
        Product,
        InvoiceItem,
        SubmitedData
    >
    implements InvoiceOperations<InvoiceItem>
{
    private afterSearch(invoiceItem: InvoiceItem) {
        this.add(invoiceItem);
        this.props.search.changeSearchValue("");
    }

    private increaseItem(invoiceItem: InvoiceItem, quantity: number) {
        const newItem = { ...invoiceItem };
        newItem.quantity += quantity;
        newItem.total = parseFloat(
            (newItem.quantity * newItem.price).toFixed(2)
        );
        return newItem;
    }

    private correctTotal(invoiceItem: InvoiceItem) {
        return {
            ...invoiceItem,
            total: parseFloat(
                (invoiceItem.price * invoiceItem.quantity).toFixed(2)
            ),
        };
    }

    private addToExistingItem(invoiceItem: InvoiceItem) {
        const invoiceItems = this.props.invoiceItems.map((item) => {
            const itemMatch = item.id === invoiceItem.id;
            if (itemMatch) return this.increaseItem(item, 1);
            return item;
        });
        this.props.setInvoiceItems(invoiceItems);
        return;
    }

    private searchFocus() {
        const timeout = setTimeout(() => {
            this.props.searchInputRef.current?.focus();
            clearTimeout(timeout);
        }, 0);
    }

    public search: Search;
    public submit: Submit;
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        super();
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
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

    public add(invoiceItem: InvoiceItem) {
        const itemExistInInvoice = this.props.invoiceItems.find(
            (item) => item.id == invoiceItem.id
        );
        if (itemExistInInvoice) return this.addToExistingItem(invoiceItem);
        this.props.setInvoiceItems([invoiceItem, ...this.props.invoiceItems]);
    }

    public edit(invoiceItem: InvoiceItem) {
        const invoiceItems = this.props.invoiceItems.map((item) => {
            const itemMatch = item.id === invoiceItem.id;
            if (itemMatch) return this.correctTotal(invoiceItem);
            return item;
        });
        this.props.setInvoiceItems(invoiceItems);
        this.searchFocus();
    }

    public remove(invoiceItem: InvoiceItem) {
        this.props.setInvoiceItems(
            this.props.invoiceItems.filter(
                (item) => item.key !== invoiceItem.key
            )
        );
    }

    public cancelOperation() {
        this.props.setInvoiceItems([]);
    }
}

type SearchParams = {
    attribute: string;
    value: string;
};
class Search implements Searching<SearchParams, Product, InvoiceItem> {
    constructor(
        public readonly searchParams: SearchParams,
        public readonly afterSearch: (invoiceItem: InvoiceItem) => void
    ) {
        this.onSearch = this.onSearch.bind(this);
        this.factory = new Factory();
    }
    public factory: BuyingInvoiceItemFactory;
    public onSearch() {
        Inertia.reload({
            data: this.searchParams,
            only: ["product", "flash"],
            preserveState: true,
            onSuccess: (page) => {
                let product = page.props.product as Product | null;
                if (product === null) return message.error("المنتج غير موجود");
                const invoiceItem = this.factory.factory(product);
                this.afterSearch(invoiceItem);
            },
        });
    }
}

class Factory implements BuyingInvoiceItemFactory {
    public factory(product: Product): InvoiceItem {
        return {
            key: product.id.toString(),
            id: product.id,
            product_id: product.id,
            quantity: 1,
            name: product.name,
            barcode: product.barcode,
            price: product.last_buying_price,
            total: product.last_buying_price * 1,
        };
    }
}

class Submit implements Submiting<SubmitedData> {
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        this.onSubmit = this.onSubmit.bind(this);
    }
    public remapItemsToSubmit() {
        return this.props.invoiceItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            buying_price: item.price,
        }));
    }

    public onSubmit() {
        this.props.setLoading(true);
        Inertia.post(
            BuyInvServices.storeURL(),
            {
                invoiceItems: this.remapItemsToSubmit() as any,
                total_cost: this.props.invoiceItems.reduce(
                    (total, item) => total + item.total,
                    0
                ),
                stock_id: this.props.stockId,
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
