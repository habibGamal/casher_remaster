import { StockItemWithProductAndStock } from "./StockItem";

export default interface OpeningStockItem {
    id: number;
    stock_item_id: number;
    buying_price: number;
    selling_price: number;
    created_at: string;
    updated_at: string;
}


export interface OpeningStockEntry extends OpeningStockItem {
    stock_item: StockItemWithProductAndStock;
}
