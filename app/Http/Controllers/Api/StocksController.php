<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class StocksController extends Controller
{
    function productInfoFromAllStocks(Product $product)
    {
        $data = $product->with('boxes.stockItems.stocks');
        $stockItems = $product->boxes->map(function ($box) {
            return $box->stockItems;
        })->flatten();
        $data = $stockItems->groupBy('stock_id')->map(function ($stockItems) {
            return [
                'stock_name' => $stockItems->first()->stock->name,
                'quantity' => $stockItems->sum('quantity')
            ];
        })->values();
        return response()->json(
            [
                "stockItems" => $data,
            ],
            200
        );
    }
}
