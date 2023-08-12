import { Inertia } from "@inertiajs/inertia";
import CreateInvoiceManager, {
    BaseInvoiceItem,
    InvoiceOperations,
    Factoring,
    InvoiceOperationPropsStates,
    Searching,
    Submiting,
    ReturnInvoiceOperations,
} from "./invoice_manager/CreateInvoiceManager";
import { message } from "antd";
import OpeningStockServices from "../services/products/OpeningStockServices";
import OpeningStockOperations, { InvoiceItem } from "./invoice_manager/OpeningStockOperations";
import NoReturnOperations from "./invoice_manager/NoReturnOperations";

interface Product {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
}

type SubmitedData = {}[];
interface OpeningStockItemFactory extends Factoring<Product, InvoiceItem> {}

export default class CreateOpeningStockManager
    extends CreateInvoiceManager<
        SearchParams,
        Product,
        InvoiceItem,
        SubmitedData,
        InvoiceItem
    >
{
    private afterSearch(invoiceItem: InvoiceItem) {
        this.invoiceOperations.add(invoiceItem);
        this.props.search.changeSearchValue("");
    }

    public search: Search;
    public submit: Submit;
    public invoiceOperations: OpeningStockOperations;
    public returnInvoiceOperations: NoReturnOperations;
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        super();
        this.invoiceOperations = new OpeningStockOperations(props);
        this.returnInvoiceOperations = new NoReturnOperations(null);
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

    public displayInvoiceNumber(
        invoiceNumber?: number | undefined
    ): JSX.Element | null {
        return null;
    }

    public actionBtnTitle(): string {
        return "إضافة الرصيد";
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
    public factory: OpeningStockItemFactory;
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

class Factory implements OpeningStockItemFactory {
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
            OpeningStockServices.storeURL(),
            {
                items: this.remapItemsToSubmit() as any,
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
