import { Inertia } from "@inertiajs/inertia";
import { message } from "antd";
import InvoiceHandler from "../../interfaces/InvoiceHandler";
import InvoiceHandlerProps from "../../interfaces/InvoiceHandlerProps";

interface InvoiceItem {
    product_id: number;
    quantity: number;
    name: string;
    barcode: string;
    price: number;
    total: number;
}

interface Product {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
}

class BuyInvHandler implements InvoiceHandler<InvoiceItem> {
    protected props: InvoiceHandlerProps<InvoiceItem>;
    constructor(props: InvoiceHandlerProps<InvoiceItem>) {
        this.props = props;
        this.onSearch = this.onSearch.bind(this);
        this.cancelOperation = this.cancelOperation.bind(this);
        this.onAddInvoiceItem = this.onAddInvoiceItem.bind(this);
        this.onEditInvoiceItem = this.onEditInvoiceItem.bind(this);
        this.onDeleteInvoiceItem = this.onDeleteInvoiceItem.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getInvoiceItems = this.getInvoiceItems.bind(this);
        this.getRowKey = this.getRowKey.bind(this);
    }

    protected isItemInInvoice(id: number) {
        return this.props.invoiceItems.find((item) => item.product_id === id);
    }

    protected correctTotal(item: InvoiceItem) {
        return {
            ...item,
            total: parseFloat((item.price * item.quantity).toFixed(2)),
        };
    }

    protected increaseItemByOne(item: any) {
        const newItem = {
            ...item,
            quantity: parseInt(item.quantity) + 1,
        };
        return this.correctTotal(newItem);
    }

    getInvoiceItems() {
        return this.props.invoiceItems;
    }

    private factory(product: Product): InvoiceItem {
        return {
            product_id: product.id,
            quantity: 1,
            name: product.name,
            barcode: product.barcode,
            price: product.last_buying_price,
            total: product.last_buying_price * 1,
        };
    }

    getRowKey(item: InvoiceItem) {
        return item.product_id;
    }

    onAddInvoiceItem(model: any) {
        const invoiceItem = this.factory(model);
        if (this.isItemInInvoice(invoiceItem.product_id)) {
            this.props.setInvoiceItems(
                this.props.invoiceItems.map((item) => {
                    if (item.product_id === invoiceItem.product_id)
                        return this.increaseItemByOne(item);
                    else return item;
                })
            );
            return;
        }
        this.props.setInvoiceItems([invoiceItem, ...this.props.invoiceItems]);
    }

    onSearch() {
        Inertia.reload({
            data: this.props.search.data,
            only: ["product", "flash"],
            preserveState: true,
            onSuccess: (page) => {
                let product = page.props.product as Product;
                if (product === null) {
                    message.error("المنتج غير موجود");
                    return;
                }
                this.onAddInvoiceItem(product);
                this.props.search.changeSearchValue("");
            },
        });
    }

    onEditInvoiceItem(model: any) {
        this.props.setInvoiceItems(
            this.props.invoiceItems.map((item) => {
                if (item.product_id === model.product_id)
                    return this.correctTotal(model);
                else return item;
            })
        );
        const timeout = setTimeout(() => {
            this.props.searchInputRef.current?.focus();
            clearTimeout(timeout);
        }, 0);
    }

    onDeleteInvoiceItem(model: any) {
        this.props.setInvoiceItems(
            this.props.invoiceItems.filter(
                (item) => item.product_id !== model.product_id
            )
        );
    }

    emptyItems() {
        this.props.setInvoiceItems([]);
    }

    cancelOperation() {
        this.emptyItems();
    }

    private remapItemsToSubmit() {
        return this.props.invoiceItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            buying_price: item.price,
            total: item.total,
        }));
    }

    onSubmit() {
        this.props.setLoading(true);
        Inertia.post(
            BuyInvServices.storeURL(),
            {
                invoiceItems: this.remapItemsToSubmit() as any,
                total_cost: this.props.invoiceItems.reduce(
                    (total, item) => total + item.total,
                    0
                ),
                stock_id: this.props.extraData?.stock_id,
            },
            {
                onSuccess: (page) => {
                    this.props.setLoading(false);
                    if (!(page.props.flash as any).error) {
                        this.emptyItems();
                    }
                },
            }
        );
    }
}

export default class BuyInvServices {
    static BASE_ROUTE = "/buying-invoice";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`, undefined, { preserveState: true });
    }

    static create() {
        Inertia.get(`${this.BASE_ROUTE}/create`);
    }

    static storeURL() {
        return `${this.BASE_ROUTE}/store`;
    }

    static show(id: number) {
        Inertia.get(`${this.BASE_ROUTE}/${id}`);
    }

    static getHandler(
        props: InvoiceHandlerProps<InvoiceItem>
    ): InvoiceHandler<InvoiceItem> {
        return new BuyInvHandler(props);
    }
}
