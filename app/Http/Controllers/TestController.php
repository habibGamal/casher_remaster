<?php

namespace App\Http\Controllers;

use App\Enums\SearchSelectSlug;
use App\Models\Product;
use App\Render\ProductRender;
use App\Utilities\RenderSuiteTableDataConfig;
use App\Utilities\TableFormater;
use Illuminate\Http\Request;

class TestController extends Controller
{
    function index(Request $request)
    {
        return inertia()->render(
            'RenderSuiteTableData',
            (new ProductRender)->render(),
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'barcode' => 'required|string|min:1|unique:products,barcode',
            'last_buying_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'minimum_stock' => 'nullable|numeric',
            'has_expire_date' => 'required|boolean',
            'unit_or_weight' => 'required|boolean',
            'unit' => 'nullable|string',
            'product_group_id' => 'nullable|exists:product_groups,id',
        ]);
        Product::create($request->all());
        return redirect()->route('test.index');
    }

    public function delete(Product $product)
    {
        $product->delete();
        return redirect()->route('test.index');
    }
}
