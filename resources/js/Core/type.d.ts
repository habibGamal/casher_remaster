type ReceiptItem = PurchaseInvoiceItem | SalesInvoiceItem;
// total field should be in all ReceiptItem
interface PurchaseInvoiceItem {
    id: number;
    name: string;
    quantity: number;
    cost: number;
    tax: number;
    total: number;
    expire_date: string;
}

interface SalesInvoiceItem {
    id: number;
    name: string;
    quantity: number;
    cost: number;
    price: number;
    tax: number;
    total: number;
}

interface ReceiptConfig {
    info: {
        type: string;
        title: [string, string];
        receipt_number: number;
        from: {
            title: [string, string];
            type: string;
        };
        to: {
            title: [string, string];
            type: string;
        };
    };
    columns: {
        [key: string]: {
            title: [string, string];
            editable?: boolean;
        };
    };
}
