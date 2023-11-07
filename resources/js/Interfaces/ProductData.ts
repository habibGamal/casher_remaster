export default interface ProductData {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
    selling_price: number;
    minimum_stock: number;
    has_expire_date: number;
    unit_or_weight: number;
    unit: string;
    product_group_id: number;
    created_at: string;
    updated_at: string;
    buyingInvoicesItems: {
        id: number;
        buying_invoice_id: number;
        box_id: number;
        quantity: number;
        created_at: string;
        updated_at: string;
    }[];
    returnBuyingInvoicesItems: {
        id: number;
        product_id: number;
        return_buying_invoice_id: number;
        quantity: number;
        return_price: number;
        created_at: string;
        updated_at: string;
    }[];
    sellingInvoicesItems: {
        id: number;
        selling_invoice_id: number;
        stock_item_id: number;
        quantity: number;
        selling_price: number;
        created_at: string;
        updated_at: string;
    }[];
    returnSellingInvoicesItems: {
        id: number;
        return_selling_invoice_id: number;
        product_id: number;
        quantity: number;
        return_price: string;
        created_at: string;
        updated_at: string;
    }[];
    product_group: {
        id: number;
        name: string;
    };
    boxes: {
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
    }[];
}
