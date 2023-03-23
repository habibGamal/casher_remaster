<?php

namespace App\Http\Controllers;

use App\Models\OpeningStockItem;
use App\Models\StockItem;
use App\Services\OpeningStockServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OpeningStockItemController extends Controller
{
    public $index = 'products/OpeningStocks';
    public function index(Request $request, OpeningStockServices $openingStockServices)
    {
        return Inertia::render($this->index, [
            'openingStockItems' => fn () => $openingStockServices->get_stocks($request, 'openingStockItems'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'buying_price' => 'required|numeric',
            'expiration_date' => 'required|date',
            'stock_id' => 'required|exists:stocks,id',
        ]);
        $stock_item = StockItem::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->selling_price,
            'expiration_date' => $request->expiration_date,
            'stock_id' => $request->stock_id,
        ]);
        OpeningStockItem::create([
            'stock_item_id' => $stock_item->id,
            'buying_price' => $request->buying_price,
            'selling_price' => $request->selling_price,
        ]);
        return redirect()->route('opening-stock.index');
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
