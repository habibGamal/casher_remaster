import { message } from "antd";
import {
    BaseInvoiceItem,
    ReturnInvoiceOperationPropsStates,
    ReturnInvoiceOperations,
} from "./CreateInvoiceManager";


export interface InvoiceItem extends BaseInvoiceItem {
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

export default class ReturnSellingInvoiceOperations
    implements ReturnInvoiceOperations<InvoiceItem>
{
    private isReturnQuantityValid(invoiceItem: InvoiceItem) {
        const isValid =
            invoiceItem.return_quantity <= invoiceItem.available_quantity;
        if (!isValid) message.error("الكمية المرتجعة أكبر من الكمية المتاحة");
        return isValid;
    }

    private correctTotal(invoiceItem: InvoiceItem) {
        const total = invoiceItem.return_price * invoiceItem.return_quantity;
        return {
            ...invoiceItem,
            total: parseFloat(total.toFixed(2)),
        };
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
            const itemMatch = item.id === invoiceItem.id;
            if (!itemMatch) return item;
            if (!this.isReturnQuantityValid(invoiceItem)) return item;
            return this.correctTotal(invoiceItem);
        });
        this.props.setInvoiceItems(invoiceItems);
    }

    public cancelOperation() {
        this.props.setInvoiceItems([]);
    }
}
