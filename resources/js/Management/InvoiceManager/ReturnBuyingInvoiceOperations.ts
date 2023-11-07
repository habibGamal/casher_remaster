import { message } from "antd";
import {
    BaseInvoiceItem,
    ReturnInvoiceOperationPropsStates,
    ReturnInvoiceOperations,
} from "./CreateInvoiceManager";

export interface InvoiceItem extends BaseInvoiceItem {
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

export default class ReturnBuyingInvoiceOperations
    implements ReturnInvoiceOperations<InvoiceItem>
{
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
    constructor(public props: ReturnInvoiceOperationPropsStates<InvoiceItem>) {
        this.edit = this.edit.bind(this);
        this.cancelOperation = this.cancelOperation.bind(this);
        this.getInvoiceItems = this.getInvoiceItems.bind(this);
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
