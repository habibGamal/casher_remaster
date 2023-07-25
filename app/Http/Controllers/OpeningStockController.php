<?php

namespace App\Http\Controllers;

use App\Models\OpeningStockItem;
use App\Models\Product;
use App\Models\Stock;
use App\Models\StockItem;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class OpeningStockController extends Controller
{
    public $index = 'products/OpeningStocks';
    public function index(Request $request)
    {
        return inertia()->render($this->index, [
            'openingStockItems' => fn () => TableSettingsServices::pagination(OpeningStockItem::with(['stockItem.product:id,name,barcode', 'stockItem.stock:id,name']), $request, 'openingStockItems'),
            'products' => inertia()->lazy(function () use ($request) {
                return Product::select(['id', 'name'])
                    ->where('barcode', 'like', '%' . $request->barcode . '%')
                    ->get();;
            }),
            'stocks' => inertia()->lazy(function () use ($request) {
                return Stock::select(['id', 'name'])
                    ->where('name', 'like', '%' . $request->stock_name . '%')
                    ->get();;
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric',
            'buying_price' => 'required|numeric',
            'stock_id' => 'required|exists:stocks,id',
        ]);
        $stock_item = StockItem::create($validated);
        OpeningStockItem::create([
            'stock_item_id' => $stock_item->id,
            'buying_price' => $request->buying_price,
        ]);
        return redirect()->back();
    }

    public function update(Request $request, OpeningStockItem $openingStockItem)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'buying_price' => 'required|numeric',
            'expiration_date' => 'required|date',
            'stock_id' => 'required|exists:stocks,id',
        ]);
        $stock_item = $openingStockItem->stockItem;
        $stock_item->update([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->selling_price,
            'expiration_date' => $request->expiration_date,
            'stock_id' => $request->stock_id,
        ]);
        $openingStockItem->update([
            'buying_price' => $request->buying_price,
            'selling_price' => $request->selling_price,
        ]);
        return redirect()->route('opening-stock.index');
    }

    public function delete(OpeningStockItem $openingStockItem)
    {
        $openingStockItem->stockItem->delete();
        $openingStockItem->delete();
        return redirect()->route('opening-stock.index');
    }
}
