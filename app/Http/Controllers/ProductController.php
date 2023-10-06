<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductGroup;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    private $index = 'Products/Products';

    public function index(Request $request)
    {
        return inertia()->render($this->index, [
            'products' =>  fn () => TableSettingsServices::pagination(Product::with('productGroup:id,name'), $request, 'products'),
            'productGroups' => inertia()->lazy(function () use ($request) {
                return ProductGroup::select(['id', 'name'])
                    ->where('name', 'like', '%' . $request->product_group_name . '%')
                    ->get();;
            }),

        ]);
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
        return redirect()->route('products.index');
    }


    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string',
            'barcode' => ['required', 'string', 'min:1', Rule::unique('products')->ignore($product->id)],
            'last_buying_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
            'minimum_stock' => 'nullable|numeric',
            'has_expire_date' => 'required|boolean',
            'unit_or_weight' => 'required|boolean',
            'unit' => 'nullable|string',
            'product_group_id' => 'nullable|exists:product_groups,id',
        ]);
        $product->update($request->all());
        return redirect()->back();
    }

    public function remove_product_from_group(Product $product)
    {
        $product->product_group_id = null;
        $product->save();
        return redirect()->back();
    }

    public function delete(Product $product)
    {
        try {
            $product->deleteOrFail();
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->back()->with('error', 'لا يمكن حذف هذا المنتج لوجود حركات عليه');
        }
        return redirect()->back()->with('success', 'تم حذف المنتج بنجاح');
    }
}
