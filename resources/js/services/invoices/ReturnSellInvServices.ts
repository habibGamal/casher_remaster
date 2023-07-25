import { Inertia } from "@inertiajs/inertia";
import InvoiceHandler from "../../interfaces/InvoiceHandler";
import InvoiceHandlerProps from "../../interfaces/InvoiceHandlerProps";
import { message } from "antd";

interface InvoiceItem {
    id: number;
    product_id: number;
    available_quantity: number;
    return_quantity: number;
    name: string;
    barcode: string;
    selling_price: number;
    return_price: number;
    total: number;
}

// typing the data comming from backend
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

class ReturnSellInvHandler implements InvoiceHandler<InvoiceItem> {
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

    private factory(item: SellingInvoiceItem): InvoiceItem {
        return {
            id: item.stock_item.id,
            product_id: item.stock_item.box.product_id,
            available_quantity: item.quantity,
            return_quantity: 0,
            name: item.stock_item.box.product.name,
            barcode: item.stock_item.box.product.barcode,
            selling_price: item.selling_price,
            return_price: item.selling_price,
            total: 0,
        };
    }

    onAddInvoiceItem(model: any) {
        // unused
    }

    onSearch() {
        Inertia.reload({
            data: this.props.search.data,
            only: ["selling_invoice"],
            preserveState: true,
            onSuccess: (page) => {
                const data = page.props.selling_invoice as SellingInvoice;
                console.log(data);
                if (data === null) {
                    message.error("لا يوجد فاتورة شراء بهذا الرقم");
                    this.emptyItems();
                    return;
                }
                this.props.setInvoiceData({
                    selling_invoice_id: data.id,
                });
                this.props.setInvoiceItems(
                    this.processInvoice(data).map((item) => this.factory(item))
                );
            },
        });
    }

    private processInvoice(data: SellingInvoice) {
        const sellingInvoiceItemsByProductId = this.mergeItems(
            data.selling_invoice_items
        );

        const previousReturnedItems = data.return_selling_invoices
            .map((inv) => inv.items)
            .flat();

        const itemsWithAvailableQuantities =
            this.calculateAvailableReturnQuantities(
                sellingInvoiceItemsByProductId,
                previousReturnedItems
            );

        return itemsWithAvailableQuantities;
    }

    private mergeItems(items: SellingInvoiceItem[]) {
        const map = new Map<number, SellingInvoiceItem>();
        items.forEach((item) => {
            const {
                stock_item: { box:{product_id} },
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
        returnItems.forEach((item) => {
            const oldItem = map.get(item.product_id);
            if (oldItem) {
                oldItem.quantity -= item.quantity;
                map.set(item.product_id, oldItem);
            }
        });
        return Array.from(map.values());
    }

    private correctTotal(item: InvoiceItem) {
        item.total = item.return_quantity * item.return_price;
        return item;
    }

    private validReturnedQuantity(item: InvoiceItem) {
        const valid = item.return_quantity <= item.available_quantity;
        if (!valid) message.error("الكمية المرتجعة أكبر من الكمية المتاحة");
        return item.return_quantity <= item.available_quantity;
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
            stock_item_id: item.id,
            product_id: item.product_id,
            quantity: item.return_quantity,
            return_price: item.return_price,
            total: item.total,
        }));
    }

    onSubmit() {
        this.props.setLoading(true);
        Inertia.post(
            ReturnSellInvServices.storeURL(),
            {
                selling_invoice_id: this.props.invoiceData.selling_invoice_id,
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

export default class ReturnSellInvServices {
    static BASE_ROUTE = "/return-selling-invoice";
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
        return new ReturnSellInvHandler(props);
    }
}
