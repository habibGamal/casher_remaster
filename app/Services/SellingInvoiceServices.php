<?php

namespace App\Services;

use App\Models\Box;
use App\Models\Product;
use App\Models\Stock;
use App\Models\StockItem;

class SellingInvoiceServices
{

    private function validateStock($id)
    {
        $stock = Stock::find($id);
        if ($stock == null)
            return redirect()->back()->with('error', 'هذا المخزن غير موجود');
        return $stock;
    }

    private function validateStockItemQuantity($stock_id, $product_id, $quantity)
    {
        $stock_items = StockItem::where('stock_id', $stock_id)
            ->where('stock_items.quantity', '>', 0)
            ->join('boxes', 'stock_items.box_id', '=', 'boxes.id')
            ->where('boxes.product_id', $product_id)
            ->get();
        if ($stock_items->sum('quantity') < $quantity)
            return redirect()->back()->with('error', 'لا يوجد كمية متاحة من هذا المنتج في المخزن المختار');
        return $stock_items;
    }

    function buildInvoiceItems($stock_id, $items)
    {
        $stock = $this->validateStock($stock_id);


        $product_ids = array_column($items, 'product_id');
        $products = Product::select(['id', 'selling_price'])->whereIn('id', $product_ids)->get()->keyBy('id');

        $invoice_items = [];

        foreach ($items as $item) {
            $stock_items = $this->validateStockItemQuantity($stock->id, $item['product_id'], $item['quantity']);
            $selling_price = $products[$item['product_id']]->selling_price;;
            $required_quantity = $item['quantity'];

            $stock_items->each(function ($stockItem) use (&$required_quantity, &$invoice_items, $selling_price) {

                $quantity_satified = $required_quantity == 0;
                if ($quantity_satified)  return;

                $stock_item_has_required_quantity = $stockItem->quantity >= $required_quantity;

                if ($stock_item_has_required_quantity) {
                    $stockItem->quantity -= $required_quantity;
                    $invoice_items[] = [
                        'stock_item_id' => $stockItem->id,
                        'quantity' => $required_quantity,
                        'selling_price' => $selling_price,
                    ];
                    $stockItem->save();
                    $required_quantity = 0;
                } else {
                    $required_quantity -= $stockItem->quantity;
                    $invoice_items[] = [
                        'stock_item_id' => $stockItem->id,
                        'quantity' => $stockItem->quantity,
                        'selling_price' => $selling_price,
                    ];
                    $stockItem->quantity = 0;
                    $stockItem->save();
                }
            });
        }
        return $invoice_items;
    }
}
