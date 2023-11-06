type ReceiptItem = PurchaseInvoiceItem | SalesInvoiceItem;

interface ReceiptItemBase {
    key: number;
    id: number;
    barcode: string;
    name: string;
}

// total field should be in all ReceiptItem
interface PurchaseInvoiceItem extends ReceiptItemBase {
    quantity: number;
    cost: number;
    tax: number;
    total: number;
    expiry_date: string;
}

interface SalesInvoiceItem extends ReceiptItemBase {
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
        search_route: string;
    };
    columns: {
        [key: string]: {
            title: [string, string];
            editable?: boolean;
        };
    };
}

interface CreateReceiptSearch {
    search(
        endpoint: string,
        searchData: {
            attribute: string;
            value: string;
        },
        sourceId?: string,
        distId?: string
    ): Promise<ReceiptItem | null>;
}

interface CreateReceiptValidation {
    validation(receiptItem: ReceiptItem): boolean;
}

interface CreateReceiptUpdateTotal {
    updateTotal(receiptItem: ReceiptItem): ReceiptItem;
}

interface CreateReceiptIncreaseQuantity {
    increaseQuantity(item: ReceiptItem, quantity: number): ReceiptItem;
}
