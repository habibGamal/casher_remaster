<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductGroup;
use App\Render\ProductGroupRender;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class ProductGroupController extends Controller
{
    private $index = 'Products/ProductGroups';

    public function index()
    {
        return inertia()->render(
            'RenderSuiteTableData',
            (new ProductGroupRender)->render(),
        );
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

    public function destroy(ProductGroup $productGroup)
    {
        $productGroup->delete();
        return redirect()->route('product-groups.index');
    }
}
