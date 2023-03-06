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
            'paginate' =>  fn () => $productGroupServices->paginate($request),
            'productsInGroup' => Inertia::lazy(function () use ($request) {
                if (!$request->id) return;
                return ProductGroup::select(['id','name'])->with('products:id,name,barcode,product_group_id')->find($request->id);
            }),
        ]);
    }

    public function show(ProductGroup $productGroup)
    {
        return Inertia::render($this->index, [
            'products' =>  $productGroup->products,
        ]);
    }

    public function search(Request $request, ProductGroupServices $productGroupServices)
    {
        return Inertia::render($this->index, [
            'paginate' =>  fn () => $productGroupServices->paginateWithSearch($request),
            'productsInGroup' => Inertia::lazy(function () use ($request) {
                if (!$request->id) return;
                return ProductGroup::select(['id','name'])->with('products:id,name,barcode')->find($request->id);
            }),
        ]);
    }
}
