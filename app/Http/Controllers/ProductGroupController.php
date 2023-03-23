<?php

namespace App\Http\Controllers;

use App\Models\ProductGroup;
use App\Services\ProductGroupServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductGroupController extends Controller
{
    private $index = 'products/ProductGroups';

    public function index(Request $request, ProductGroupServices $productGroupServices)
    {
        return Inertia::render($this->index, [
            'productGroups' =>  fn () => $productGroupServices->get_product_groups($request, 'productGroups'),
            'productsInGroup' => Inertia::lazy(function () use ($request, $productGroupServices) {
                if (!$request->productGroupId) return;
                return $productGroupServices->get_products_in_groups($request, 'productsInGroup');
            }),
        ]);
    }

    public function show(ProductGroup $productGroup)
    {
        return Inertia::render($this->index, [
            'products' =>  $productGroup->products,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);
        ProductGroup::create($request->all());
        return redirect()->route('product-groups.index');
    }


    public function update(Request $request,ProductGroup $productGroup)
    {
        $request->validate([
            'name' => 'required|string',
        ]);
        $productGroup->update($request->all());
        return redirect()->route('product-groups.index');
    }

    public function delete(ProductGroup $productGroup)
    {
        $productGroup->delete();
        return redirect()->route('product-groups.index');
    }
}
