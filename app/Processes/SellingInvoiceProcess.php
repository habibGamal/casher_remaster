<?php

namespace App\Processes;

use App\Models\Product;
use App\Models\Stock;
use App\Models\StockItem;

class SellingInvoiceProcess
{
    //type hinting
    private $_stock_id;
    /**
     * @var \Illuminate\Support\Collection
     */
    private $_invoice_items;
    /**
     * @var \Illuminate\Support\Collection
     */
    private $_selling_invoice_items;
    public function __construct($data)
    {
        $this->_stock_id = $data['stock_id'];
        $this->_invoice_items = collect($data['invoiceItems']);
        $this->_selling_invoice_items = collect([]);
    }


    public function sellingInvoiceItems()
    {
        return $this->_selling_invoice_items;
    }

    private function checkStock()
    {
        $stock = Stock::find($this->_stock_id);
        if ($stock == null)
            throw new \Exception('هذا المخزن غير موجود');
        return $stock;
    }

    /**
     * @param $stock_id
     * @param $product_id
     * @param $quantity
     * @return \Illuminate\Http\RedirectResponse|StockItem[]|\Illuminate\Support\Collection
     * @throws \Exception
     */
    private function getStockItems($product_id, $quantity)
    {
        $stock_items = StockItem::select(['stock_items.id', 'stock_items.quantity'])->where('stock_id', $this->_stock_id)
            ->where('stock_items.quantity', '>', 0)
            ->join('boxes', 'stock_items.box_id', '=', 'boxes.id')
            ->where('boxes.product_id', $product_id)
            ->get();
        if ($stock_items->sum('quantity') < $quantity)
            throw new \Exception('لا يوجد كمية متاحة من هذا المنتج في المخزن المختار');
        return $stock_items;
    }

    private function removeQuanitiesFromStockItems($stock_item, &$required_quantity, $selling_price)
    {
        $quantity_satified = $required_quantity == 0;
        if ($quantity_satified)  return;

        $selling_invoice_item_quantity = 0;
        $stock_item_has_required_quantity = $stock_item->quantity >= $required_quantity;
        if ($stock_item_has_required_quantity) {
            $stock_item->quantity -= $required_quantity;
            $selling_invoice_item_quantity = $required_quantity;
            $required_quantity = 0;
        } else {
            $required_quantity -= $stock_item->quantity;
            $selling_invoice_item_quantity = $stock_item->quantity;
            $stock_item->quantity = 0;
        }
        $this->_selling_invoice_items->push([
            'stock_item_id' => $stock_item->id,
            'quantity' => $selling_invoice_item_quantity,
            'selling_price' => $selling_price,
        ]);
        $stock_item->save();
    }

    public function process()
    {
        $this->checkStock();
        $products_ids = $this->_invoice_items->pluck('product_id')->toArray();
        $products = Product::select(['id', 'selling_price'])->whereIn('id', $products_ids)->get()->keyBy('id');
        $this->_invoice_items->each(function ($invoice_item) use ($products) {
            $stock_items = $this->getStockItems($invoice_item['product_id'], $invoice_item['quantity']);
            $selling_price = $products[$invoice_item['product_id']]->selling_price;;
            $required_quantity = $invoice_item['quantity'];
            $stock_items->each(function ($stock_item) use (&$required_quantity, $selling_price) {
                $this->removeQuanitiesFromStockItems($stock_item, $required_quantity, $selling_price);
            });
        });
    }

}
