<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductGroup;
use App\Services\ProductServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    private $index = 'products/Products';

    public function index(Request $request, ProductServices $productServices)
    {
        return Inertia::render($this->index, [
            'products' =>  fn () => $productServices->get_products($request, 'products'),
            'productGroups' => Inertia::lazy(function () use ($request, $productServices) {
                return $productServices->search_in_product_groups($request);
            }),
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'barcode' => 'required|string|min:1',
            'buying_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'minimum_stock' => 'nullable|numeric',
            'has_expire_date' => 'required|boolean',
            'unit_or_weight' => 'required|boolean',
            'unit' => 'nullable|string',
            'product_group_id' => 'nullable|exists:product_groups,id',
        ]);
        Product::create($request->all());
        return redirect()->route('products.index');
    }


    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string',
            'barcode' => 'required|string|min:1',
            'buying_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'minimum_stock' => 'nullable|numeric',
            'has_expire_date' => 'required|boolean',
            'unit_or_weight' => 'required|boolean',
            'unit' => 'nullable|string',
            'product_group_id' => 'nullable|exists:product_groups,id',
        ]);
        $product->update($request->all());
        return redirect()->route('products.index');
    }

    public function delete(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}
