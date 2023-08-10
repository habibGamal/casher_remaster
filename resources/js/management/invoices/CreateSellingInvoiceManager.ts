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
import detectERR from "../../helpers/detectERR";
import SellInvServices from "../../services/invoices/SellInvServices";

interface Product {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
    selling_price: number;
    available_quantity: number;
}
interface InvoiceItem extends BaseInvoiceItem {
    id: number;
    name: string;
    barcode: string;
    buying_price: number;
    selling_price: number;
    quantity: number;
    available_quantity: number;
    total: number;
}
type SubmitedData = {}[];
interface SellingInvoiceItemFactory extends Factoring<Product, InvoiceItem> {}

export default class CreateSellingInvoiceManager
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
            (newItem.quantity * newItem.selling_price).toFixed(2)
        );
        return newItem;
    }

    private isAvailableQuantity(invoiceItem: InvoiceItem) {
        const isAvailable =
            invoiceItem.quantity <= invoiceItem.available_quantity;
        if (!isAvailable)
            message.error("الكمية المطلوبة أكبر من الكمية المتاحة");
        return isAvailable;
    }

    private correctTotal(invoiceItem: InvoiceItem) {
        return {
            ...invoiceItem,
            total: parseFloat(
                (invoiceItem.selling_price * invoiceItem.quantity).toFixed(2)
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
                stock_id: this.props.stockId,
            },
            this.afterSearch
        );
        this.submit = new Submit(this.props);
    }

    public getInvoiceItems() {
        return this.props.invoiceItems;
    }

    public add(invoiceItem: InvoiceItem) {
        if (!this.isAvailableQuantity(invoiceItem)) return;
        const itemExistInInvoice = this.props.invoiceItems.find(
            (item) => item.id == invoiceItem.id
        );
        if (itemExistInInvoice) return this.addToExistingItem(invoiceItem);
        this.props.setInvoiceItems([invoiceItem, ...this.props.invoiceItems]);
    }

    public edit(invoiceItem: InvoiceItem) {
        if (!this.isAvailableQuantity(invoiceItem)) return;
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
    stock_id: string | null;
};
class Search implements Searching<SearchParams, Product, InvoiceItem> {
    constructor(
        public readonly searchParams: SearchParams,
        public readonly afterSearch: (invoiceItem: InvoiceItem) => void
    ) {
        this.onSearch = this.onSearch.bind(this);
        this.factory = new Factory();
    }
    public factory: SellingInvoiceItemFactory;
    public onSearch() {
        Inertia.reload({
            data: this.searchParams,
            only: ["product"],
            preserveState: true,
            onSuccess: (page) => {
                let product = page.props.product as Product | null;
                if (detectERR(product)) return;
                if (product === null) return message.error("المنتج غير موجود");
                const invoiceItem = this.factory.factory(product);
                this.afterSearch(invoiceItem);
            },
        });
    }
}

class Factory implements SellingInvoiceItemFactory {
    public factory(product: Product): InvoiceItem {
        return {
            key: product.id.toString(),
            id: product.id,
            name: product.name,
            barcode: product.barcode,
            buying_price: product.last_buying_price,
            selling_price: product.selling_price,
            available_quantity: product.available_quantity,
            quantity: 1,
            total: product.selling_price,
        };
    }
}

class Submit implements Submiting<SubmitedData> {
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        this.onSubmit = this.onSubmit.bind(this);
    }
    public remapItemsToSubmit() {
        return this.props.invoiceItems.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
        }));
    }

    public onSubmit() {
        this.props.setLoading(true);
        Inertia.post(
            SellInvServices.storeURL(),
            {
                invoiceItems: this.remapItemsToSubmit() as any,
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
