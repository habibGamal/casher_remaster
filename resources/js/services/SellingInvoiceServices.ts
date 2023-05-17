import { Inertia } from "@inertiajs/inertia";
import InvoiceHandler from "../interfaces/InvoiceHandler";
import InvoiceHandlerProps from "../interfaces/InvoiceHandlerProps";
import { message } from "antd";
import detectERR from "../helpers/detectERR";

interface InvoiceItem {
    id: number;
    name: string;
    barcode: string;
    buying_price: number;
    selling_price: number;
    quantity: number;
    available_quantity: number;
    total: number;
}

// typing the data comming from backend
interface Product {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
    selling_price: number;
    available_quantity: number;
}

class SellingInvoiceHandler implements InvoiceHandler<InvoiceItem> {
    private props: InvoiceHandlerProps<InvoiceItem>;
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

    getInvoiceItems() {
        return this.props.invoiceItems;
    }

    private factory(item: Product): InvoiceItem {
        return {
            id: item.id,
            name: item.name,
            barcode: item.barcode,
            buying_price: item.last_buying_price,
            selling_price: item.selling_price,
            available_quantity: item.available_quantity,
            quantity: 1,
            total: item.selling_price,
        };
    }

    protected isItemInInvoice(id: number) {
        return this.props.invoiceItems.find((item) => item.id === id);
    }

    protected increaseItemByOne(item: any) {
        const newItem = {
            ...item,
            quantity: parseInt(item.quantity) + 1,
        };
        console.log(item, newItem);

        return this.correctTotal(newItem);
    }

    onAddInvoiceItem(model: Product) {
        const item = this.factory(model);
        let itemExist: InvoiceItem | undefined;
        if ((itemExist = this.isItemInInvoice(item.id))) {
            this.onEditInvoiceItem(this.increaseItemByOne(itemExist));
            return;
        }
        this.props.setInvoiceItems([...this.props.invoiceItems, item]);
    }

    onSearch() {
        Inertia.reload({
            data: {
                ...this.props.search.data,
                stock_id: this.props.extraData?.stock_id,
            },
            only: ["product", "flash"],
            preserveState: true,
            onSuccess: (page) => {
                let product = page.props.product as Product;
                if (detectERR(product)) return;
                this.onAddInvoiceItem(product);
                this.props.search.changeSearchValue("");
            },
        });
    }

    private correctTotal(item: InvoiceItem) {
        item.total = item.quantity * item.selling_price;
        return item;
    }

    private validReturnedQuantity(item: InvoiceItem) {
        const isValid = item.quantity <= item.available_quantity;
        if (!isValid) message.error("الكمية المطلوبة أكبر من الكمية المتاحة");
        return isValid;
    }

    getRowKey(item: InvoiceItem) {
        return item.id;
    }

    onEditInvoiceItem(model: any) {
        this.props.setInvoiceItems(
            this.props.invoiceItems.map((item) => {
                if (item.id !== model.id) return item;
                if (!this.validReturnedQuantity(model)) return item;
                return this.correctTotal(model);
            })
        );
        const timeout = setTimeout(() => {
            this.props.searchInputRef.current?.focus();
            clearTimeout(timeout);
        }, 0);
    }

    onDeleteInvoiceItem(model: any) {
        this.props.setInvoiceItems(
            this.props.invoiceItems.filter((item) => item.id !== model.id)
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
            product_id: item.id,
            quantity: item.quantity,
            // we don't want the rest of props as they will be calculated in the backend
            // for security reasons
        }));
    }

    onSubmit() {
        this.props.setLoading(true);
        Inertia.post(
            SellingInvoiceServices.storeURL(),
            {
                stock_id: this.props.extraData?.stock_id,
                invoiceItems: this.remapItemsToSubmit() as any,
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

export default class SellingInvoiceServices {
    static BASE_ROUTE = "/selling-invoice";
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
        return new SellingInvoiceHandler(props);
    }
}
