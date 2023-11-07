<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Autocomplete extends Controller
{
    function productName()
    {
        $productName = request()->productName;
        $products = \App\Models\Product::select(['id', 'name'])->where('name', 'like', '%' . $productName . '%')->get();
        return response()->json(
            [
                "products" => $products,
            ],
            200
        );
    }
}
