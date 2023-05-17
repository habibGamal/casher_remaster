<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductGroup;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class ProductGroupController extends Controller
{
    private $index = 'products/ProductGroups';

    public function index(Request $request)
    {
        return inertia()->render($this->index, [
            'productGroups' =>  TableSettingsServices::pagination(ProductGroup::withCount('products'), $request, 'productGroups'),
        ]);
    }

    public function display_products_in_group(Request $request)
    {
        return inertia()->render($this->index, [
            'productsInGroup' => TableSettingsServices::pagination(Product::where('product_group_id', $request->productGroupId), $request, 'productsInGroup')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:product_groups,name',
        ]);
        ProductGroup::create($request->all());
        return redirect()->route('product-groups.index');
    }


    public function update(Request $request, ProductGroup $productGroup)
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
