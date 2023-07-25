<?php

namespace App\Http\Controllers;

use App\Models\Box;
use App\Models\Product;
use App\Models\Stock;
use App\Models\StockItem;
use Illuminate\Http\Request;

class TransferBetweenStocks extends Controller
{
    public function index(Request $request)
    {
        return inertia()->render('stocks/TransferBetweenStocks', [
            'stocks' => inertia()->lazy(
                function () use ($request) {
                    return  Stock::select(['id', 'name'])
                        ->where('name', 'like', '%' . $request->stock_name . '%')
                        ->get();
                }
            ),
            'product' => inertia()->lazy(
                function () use ($request) {
                    $attribute = $request->attribute;
                    $value = $request->value;
                    $stock_id = $request->stock_id;
                    if ($stock_id == null)
                        return 'ERR:يجب اختيار مخزن';
                    if ($attribute == null || $value == null)
                        return null;
                    // 1 - get the product
                    $product = Product::select(['id', 'name', 'barcode'])->where([$attribute => $value])->first();
                    if ($product == null)
                        return 'ERR:هذا المنتج غير موجود';
                    // 2 - get the stock items stock that has quantity > 0
                    $stock_items = StockItem::where('stock_id', $stock_id)
                        ->where('stock_items.quantity', '>', 0)
                        ->join('boxes', 'stock_items.box_id', '=', 'boxes.id')
                        ->where('boxes.product_id', $product->id)
                        ->get();
                    if ($stock_items->count() == 0)
                        return 'ERR:لا يوجد كمية متاحة من هذا المنتج في المخزن المختار';
                    $product->stock_items = $stock_items;
                    return $product;
                }
            ),
        ]);
    }

    public function store(Request $request)
    {
        // from_stock_id: fromStockId,
        // to_stock_id: toStockId,
        // stock_items: tableData

        // vaildate that from_stock_id and to_stock_id exists not same
        $from_stock_id = $request->from_stock_id;
        $to_stock_id = $request->to_stock_id;
        if ($from_stock_id == null || $to_stock_id == null)
            return redirect()->back()->with('error', 'يجب اختيار المخزن المنقول منه والى المخزن المنقول اليه');
        if ($from_stock_id == $to_stock_id)
            return redirect()->back()->with('error', 'لا يمكن نقل المنتجات الى نفس المخزن');

        $request->validate([
            'from_stock_id' => 'required|integer|exists:stocks,id',
            'to_stock_id' => 'required|integer|exists:stocks,id',
            'stock_items' => 'required|array|min:1',
            'stock_items.*.id' => 'required|integer|exists:stock_items,id',
            'stock_items.*.quantity' => 'required|numeric',
        ]);

        // 1 - get the stock items
        $stock_items = StockItem::whereIn('id', array_column($request->stock_items, 'id'))->get();
        // 2 - update the stock items
        $new_stock_items = [];
        foreach ($stock_items as $stock_item) {
            $transfer_quantity = $request->stock_items[array_search($stock_item->id, array_column($request->stock_items, 'id'))]['quantity'];
            $stock_item->quantity -=  $transfer_quantity;
            $new_stock_items[] = [
                'box_id' => $stock_item->box_id,
                'stock_id' => $to_stock_id,
                'quantity' => $transfer_quantity,
            ];
            $stock_item->save();
        }
        // 3 - create new stock items
        StockItem::insert($new_stock_items);

        return redirect()->back()->with('success', 'تم نقل المنتجات بنجاح');
    }
}
