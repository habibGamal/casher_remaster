export default interface Product {
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
}

export interface ProductWithProductGroup extends Product {
    product_group: {
        id: number;
        name: string;
    };
}
