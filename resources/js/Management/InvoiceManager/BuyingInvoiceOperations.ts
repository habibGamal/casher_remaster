import {
    BaseInvoiceItem,
    InvoiceOperationPropsStates,
} from "./CreateInvoiceManager";
import MainInvoiceOperations from "./MainInvoiceOperations";

export interface InvoiceItem extends BaseInvoiceItem {
    product_id: number;
    quantity: number;
    name: string;
    barcode: string;
    price: number;
}
export default class BuyingInvoiceOperations extends MainInvoiceOperations<InvoiceItem> {
    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        super(props);
    }
    public increaseItem(invoiceItem: InvoiceItem, quantity: number) {
        const newItem = { ...invoiceItem };
        newItem.quantity += quantity;
        newItem.total = parseFloat(
            (newItem.quantity * newItem.price).toFixed(2)
        );
        return newItem;
    }

    public validation(invoiceItem: InvoiceItem) {
        return true;
    }

    public correctTotal(invoiceItem: InvoiceItem) {
        return {
            ...invoiceItem,
            total: parseFloat(
                (invoiceItem.price * invoiceItem.quantity).toFixed(2)
            ),
        };
    }
}
