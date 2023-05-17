<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingStockController extends Controller
{
    public function index(Request $request)
    {
        return inertia()->render('stocks/TrackingStocks', [
            'data' => Inertia::lazy(function () use ($request) {
                if (!$request->attribute || !$request->value)
                    return [];
                $product = Product::select(['id','name'])->where([$request->attribute => $request->value])->with(['stockItems.stock'])->first();
                return $product;
            })
        ]);
    }
}