<?php

namespace App\Http\Controllers;

use App\Enums\SearchSelectSlug;
use App\Models\Product;
use App\Utilities\TableFormater;
use Illuminate\Http\Request;

class TestController extends Controller
{
    function index(Request $request)
    {
        return inertia()->render('RenderSuiteTableData', [
            'title' => ['Products', 'الاصناف'],
            'slug' => 'products',
            'products' => fn () => TableFormater::pagination(Product::with('productGroup:id,name'), $request),
            'columns' => fn () => [
                'name' => ['Name', 'اسم المنتج'],
                'barcode' => ['Barcode', 'باركود'],
                'selling_price' => ['Selling Price', 'سعر البيع'],
                'last_buying_price' => ['Last Buying Price', 'اخر سعر شراء'],
                'unit' => ['Unit', 'الوحدة'],
                'product_group.name' => ['Product Group', 'مجموعة المنتج'],
            ],
            'expandable' => fn () => [
                'has_expire_date' => ['Has Expire Date', 'له تاريخ انتهاء'],
                'minimum_stock' => ['Minimum Stock', 'الحد الادني للمخزون'],
            ],
            'actions' => fn () => [
                'edit' => true,
                'delete' => true,
            ],
            'searchable' => fn () => [
                'name' => ['Name', 'اسم المنتج'],
                'barcode' => ['Barcode', 'باركود'],
                'selling_price' => ['Selling Price', 'سعر البيع'],
                'last_buying_price' => ['Last Buying Price', 'اخر سعر شراء'],
                'unit' => ['Unit', 'الوحدة'],
                'product_group.name' => ['Product Group', 'مجموعة المنتج'],
            ],
            'store_route' => 'test.store',
            'update_route' => 'test.update',
            'delete_route' => 'test.delete',
            'form' => fn () => [
                'col.1' => true,
                'name' => [
                    'type' => 'text',
                    'label' => ['Product Name', 'اسم المنتج'],
                ],
                'barcode' => [
                    'type' => 'text',
                    'label' => ['Barcode', 'باركود'],
                ],
                'product_group_id' => [
                    'type' => 'select_search',
                    'label' => ['Product Group', 'مجموعة المنتج'],
                    'slug' => SearchSelectSlug::product_group,
                ],
                'col.2' => true,
                'selling_price' => [
                    'type' => 'number',
                    'label' => ['Selling Price', 'سعر البيع'],
                    'min' => 0,
                ],
                'last_buying_price' => [
                    'type' => 'number',
                    'label' => ['Last Buying Price', 'اخر سعر شراء'],
                    'min' => 0,
                ],
                'minimum_stock' => [
                    'type' => 'number',
                    'label' => ['Minimum Stock', 'الحد الادني للمخزون'],
                    'min' => 0,
                ],
                'col.3' => true,
                'unit_or_weight' => [
                    'type' => 'radio',
                    'label' => ['Unit Or Weight', 'الوحدة او الوزن'],
                    'options' => [
                        'true' => ['Unit', 'وحدة'],
                        'false' => ['Weight', 'وزن'],
                    ],
                ],
                'unit' => [
                    'type' => 'select',
                    'label' => ['Unit', 'الوحدة'],
                    'options' => [
                        'piece' => ['Piece', 'قطعة'],
                        'box' => ['Box', 'صندوق'],
                        'carton' => ['Carton', 'كرتونة'],
                    ],
                    'disabled' => [
                        'unit_or_weight' => 'false'
                    ]
                ],
                'has_expire_date' => [
                    'type' => 'checkbox',
                    'label' => ['Has Expire Date', 'له تاريخ انتهاء'],
                ],
            ]
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
        return redirect()->route('test.index');
    }

    public function delete(Product $product)
    {
        $product->delete();
        return redirect()->route('test.index');
    }
}
