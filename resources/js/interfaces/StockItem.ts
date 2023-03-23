import Product from "./Product";
import Stock from "./Stock";

export default interface StockItem {
    id: number;
    stock_id: number;
    product_id: number;
    quantity: number;
    price: number;
    expration_date: string;
    created_at: string;
    updated_at: string;
}

export interface StockItemWithProductAndStock extends StockItem {
    product: Partial<Product>;
    stock: Partial<Stock>;
}
