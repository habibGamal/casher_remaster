<?php

namespace App\Http\Controllers;

use App\Models\Box;
use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OpeningStockController extends Controller
{
    public function create(Request $request)
    {
        return inertia()->render('Products/OpeningStocks', [
            'stocks' => inertia()->lazy(
                function () use ($request) {
                    return  Stock::select(['id', 'name'])
                        ->where('name', 'like', '%' . $request->stock_name . '%')
                        ->get();
                }
            ),
            'product' => inertia()->lazy(function () use ($request) {
                return Product::select(['id', 'name', 'barcode', 'last_buying_price'])->where([$request->attribute => $request->value])->first();
            })
        ]);
    }

    public function store(Request $request)
    {

        if ($request->stock_id == null)
            return redirect()->back()->with('error', 'برجاء اختيار المخزن');

        $validated_items = $request->validate([
            /// check product in database will consume time
            'stock_id' => 'required|exists:stocks,id',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric',
            'items.*.buying_price' => 'required|numeric',
        ]);

        $invoice_items = collect($validated_items['items']);

        // create boxes and stock items
        $opening_stock_items_data = collect();
        $invoice_items->each(function ($item) use ($opening_stock_items_data) {
            $box = Box::create($item);
            $box->stockItems()->create([
                'stock_id' => request()->stock_id,
                'quantity' => $item['quantity'],
            ]);

            // update last_buying_price in product table
            $box->product()->update([
                'last_buying_price' => $box->buying_price,
            ]);

            $opening_stock_items_data->push([
                'box_id' => $box->id,
                'quantity' => $item['quantity'],
            ]);
        });

        // create invoice items
        DB::table('opening_stock_items')->insert($opening_stock_items_data->toArray());

        return redirect()->back()->with('success', 'تمت العملية بنجاح');
    }

}
