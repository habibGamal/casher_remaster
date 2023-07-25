import { Inertia } from "@inertiajs/inertia";
import InvoiceHandler from "../../interfaces/InvoiceHandler";
import InvoiceHandlerProps from "../../interfaces/InvoiceHandlerProps";
import { message } from "antd";

interface InvoiceItem {
    id: number;
    key: number;
    product_id: number;
    available_quantity: number;
    return_quantity: number;
    name: string;
    barcode: string;
    buying_price: number;
    return_price: number;
    stock: string;
    children: {
        id: number;
        key: number;
        stock: string;
        available_quantity: number;
        return_quantity: number;
    }[];
    total: number;
}

// typing the data comming from backend
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

class ReturnBuyInvHandler implements InvoiceHandler<InvoiceItem> {
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
    }

    getInvoiceItems() {
        return this.props.invoiceItems;
    }

    private factory(item: BuyingInvoiceItem): InvoiceItem {
        return {
            id: item.id,
            key: item.id,
            product_id: item.box.product.id,
            available_quantity: item.quantity,
            return_quantity: 0,
            name: item.box.product.name,
            barcode: item.box.product.barcode,
            buying_price: item.box.buying_price,
            return_price: item.box.buying_price,
            stock: "-",
            children: item.box.stock_items.map((stock_item) => ({
                id: item.id,
                key: stock_item.id + item.id,
                available_quantity: stock_item.quantity,
                return_quantity: 0,
                stock: stock_item.stock.name,
            })),
            total: 0,
        };
    }

    onAddInvoiceItem(model: any) {
        // unused
    }

    onSearch() {
        Inertia.reload({
            data: this.props.search.data,
            only: ["buying_invoice", "flash"],
            preserveState: true,
            onSuccess: (page) => {
                const data = page.props.buying_invoice as BuyingInvoice;
                console.log(data);
                if (data === null) {
                    message.error("لا يوجد فاتورة شراء بهذا الرقم");
                    this.emptyItems();
                    return;
                }
                this.props.setInvoiceData({
                    buying_invoice_id: data.id,
                });
                this.props.setInvoiceItems(
                    data.buying_invoice_items.map((item) => this.factory(item))
                );
            },
        });
    }

    private correctTotal(item: InvoiceItem) {
        item.return_quantity = item.children.reduce(
            (total, child) => total + parseFloat(child.return_quantity.toString()),
            0
        );
        item.total = parseFloat((item.return_quantity * item.return_price).toFixed(2));
        return item;
    }

    private validReturnedQuantity(item: InvoiceItem) {
        const valid = item.return_quantity <= item.available_quantity;
        if (!valid) message.error("الكمية المرتجعة أكبر من الكمية المتاحة");
        return item.return_quantity <= item.available_quantity;
    }

    onEditInvoiceItem(model: any) {
        this.props.setInvoiceItems(
            this.props.invoiceItems.map((item) => {
                if (item.id !== model.id) return item;
                if (!this.validReturnedQuantity(model)) return item;
                item.children = item.children.map((child) => {
                    if (child.key != model.key) return child;
                    return model;
                });
                this.correctTotal(item);
                console.log(item);
                return item;
            })
        );
    }

    onDeleteInvoiceItem(model: any) {
        // unused
    }

    emptyItems() {
        this.props.setInvoiceItems([]);
    }

    cancelOperation() {
        this.emptyItems();
    }

    private remapItemsToSubmit() {
        return this.props.invoiceItems.map((item) => ({
            box_id: item.id,
            product_id: item.product_id,
            quantity: item.return_quantity,
            return_price: item.return_price,
            stock_items: item.children.map((child) => ({
                stock_item_id: child.id,
                quantity: child.return_quantity,
            })),
        }));
    }

    onSubmit() {
        this.props.setLoading(true);
        Inertia.post(
            ReturnBuyInvServices.storeURL(),
            {
                buying_invoice_id: this.props.invoiceData.buying_invoice_id,
                invoiceItems: this.remapItemsToSubmit() as any,
                total_cash: this.props.invoiceItems.reduce(
                    (total, item) => total + item.total,
                    0
                ),
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

export default class ReturnBuyInvServices {
    static BASE_ROUTE = "/return-buying-invoice";
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
        return new ReturnBuyInvHandler(props);
    }
}
