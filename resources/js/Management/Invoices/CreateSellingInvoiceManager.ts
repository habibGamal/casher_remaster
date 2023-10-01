import { router } from '@inertiajs/react';
import CreateInvoiceManager, {
    Factoring,
    InvoiceOperationPropsStates,
    Searching,
    Submiting,
} from "../InvoiceManager/CreateInvoiceManager";
import { message } from "antd";
import {
    displayValidationErrors,
    flashHasError,
    hasErr,
} from "../../Helpers/errorHandlers";
import SellInvServices from "../../Services/Invoices/SellInvServices";
import SellingInvoiceOperations, {
    InvoiceItem,
} from "../InvoiceManager/SellingInvoiceOperations";
import NoReturnOperations from "../InvoiceManager/NoReturnOperations";

interface Product {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
    selling_price: number;
    available_quantity: number;
}

type SubmitedData = {}[];
interface SellingInvoiceItemFactory extends Factoring<Product, InvoiceItem> {}

export default class CreateSellingInvoiceManager extends CreateInvoiceManager<
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
    public invoiceOperations: SellingInvoiceOperations;
    public returnInvoiceOperations: NoReturnOperations;
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        super();
        this.invoiceOperations = new SellingInvoiceOperations(props);
        this.returnInvoiceOperations = new NoReturnOperations(null);
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
        router.reload({
            data: this.searchParams,
            only: ["product"],
            preserveState: true,
            onSuccess: (page) => {
                let product = page.props.product as Product | null;
                if (hasErr(product)) return;
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
        router.post(
            SellInvServices.storeURL(),
            {
                invoiceItems: this.remapItemsToSubmit() as any,
                stock_id: this.props.stockId,
            },
            {
                onSuccess: (page) => {
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
