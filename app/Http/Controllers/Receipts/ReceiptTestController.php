<?php

namespace App\Http\Controllers\Receipts;

use App\Enums\SearchSelectSlug;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ReceiptTestController extends Controller
{
    public function create()
    {
        return inertia()->render('Render/RenderCreateReceipt', [
            'config' => [
                'info' => [
                    'type' => 'purchase_invoice',
                    'title' => ['Purchase Invoice', 'فاتورة شراء'],
                    'receipt_number' => 1, // should be from database
                    'from' => [
                        'title' => ['Supplier', 'المورد'],
                        'type' => SearchSelectSlug::Supplier,
                    ],
                    'to' => ['title' => ['Inventory', 'المخزن'], 'type' => SearchSelectSlug::Inventory],
                ],
                'columns' => [
                    'product_code' => ['title' => ['Product Code', 'كود الصنف']],
                    'product_name' => ['title' => ['Product', 'الصنف']],
                    'quantity' => ['title' => ['Quantity', 'الكمية'], 'editable' => true],
                    'cost' => ['title' => ['Cost', 'سعر الشراء'], 'editable' => true],
                    'tax' => ['title' => ['Tax', 'الضريبة'], 'editable' => true],
                    'expiry_date' => ['title' => ['Expiry Date', 'تاريخ الصلاحية']],
                    'total' => ['title' => ['Total', 'الاجمالي']],
                ],
            ]
        ]);
    }

    public function search(Request $request)
    {
        // it should be in repository
        $product = Product::select(['id', 'name', 'barcode', 'last_buying_price'])->where([$request->attribute => $request->value])->first();
        if ($product == null)
            return response()->json(['message' => __('messages.product_not_found')], 404);
        return response()->json($product);
    }
}
