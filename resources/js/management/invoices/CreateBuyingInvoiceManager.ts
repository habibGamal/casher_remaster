import { Inertia } from "@inertiajs/inertia";
import CreateInvoiceManager, {
    Factoring,
    InvoiceOperationPropsStates,
    Searching,
    Submiting,
} from "../invoice_manager/CreateInvoiceManager";
import BuyInvServices from "../../services/invoices/BuyInvServices";
import BuyingInvoiceOperations, {
    InvoiceItem,
} from "../invoice_manager/BuyingInvoiceOperations";
import NoReturnOperations from "../invoice_manager/NoReturnOperations";
import { displayValidationErrors, hasErr } from "../../helpers/errorHandlers";
import {flashHasError} from "../../helpers/errorHandlers";

interface Product {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
}

type SubmitedData = {}[];
interface BuyingInvoiceItemFactory extends Factoring<Product, InvoiceItem> {}

export default class CreateBuyingInvoiceManager extends CreateInvoiceManager<
    SearchParams,
    Product,
    InvoiceItem,
    SubmitedData,
    InvoiceItem
> {
    private afterSearch(invoiceItem: InvoiceItem) {
        this.invoiceOperations.add(invoiceItem);
        this.props.search.changeSearchValue("");
    }

    public search: Search;
    public submit: Submit;
    public invoiceOperations: BuyingInvoiceOperations;
    public returnInvoiceOperations: NoReturnOperations;
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        super();
        this.invoiceOperations = new BuyingInvoiceOperations(props);
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
                let product = page.props.product as Product;
                if (hasErr(product)) return;
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
                stock_id: this.props.stockId,
            },
            {
                onSuccess: (page) => {
                    console.log(page);
                    this.props.setLoading(false);
                    if (!flashHasError(page)) {
                        this.props.setInvoiceItems([]);
                    }
                },
                onError: (errors) => {
                    this.props.setLoading(false);
                    displayValidationErrors(errors);
                },
            }
        );
    }
}
