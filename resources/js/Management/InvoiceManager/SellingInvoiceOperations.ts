import { message } from "antd";
import {
    BaseInvoiceItem,
    InvoiceOperationPropsStates,
} from "./CreateInvoiceManager";
import MainInvoiceOperations from "./MainInvoiceOperations";

export interface InvoiceItem extends BaseInvoiceItem {
    id: number;
    name: string;
    barcode: string;
    buying_price: number;
    selling_price: number;
    quantity: number;
    available_quantity: number;
    total: number;
}
export default class SellingInvoiceOperations extends MainInvoiceOperations<InvoiceItem> {
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        super(props);
    }
    public increaseItem(invoiceItem: InvoiceItem, quantity: number) {
        const newItem = { ...invoiceItem };
        newItem.quantity += quantity;
        newItem.total = parseFloat(
            (newItem.quantity * newItem.selling_price).toFixed(2)
        );
        return newItem;
    }

    public validation(invoiceItem: InvoiceItem) {
        const isAvailable =
            invoiceItem.quantity <= invoiceItem.available_quantity;
        if (!isAvailable)
            message.error("الكمية المطلوبة أكبر من الكمية المتاحة");
        return isAvailable;
    }

    public correctTotal(invoiceItem: InvoiceItem) {
        return {
            ...invoiceItem,
            total: parseFloat(
                (invoiceItem.selling_price * invoiceItem.quantity).toFixed(2)
            ),
        };
    }
}
