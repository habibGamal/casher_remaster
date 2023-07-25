<?php

namespace App\Http\Controllers\Invoices;

use App\Http\Controllers\Controller;
use App\Models\Box;
use App\Models\Product;
use App\Models\SellingInvoice;
use App\Models\Stock;
use App\Services\SellingInvoiceServices;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class SellingInvoiceController extends Controller
{

    function index(Request $request)
    {
        return inertia()->render('invoices/DisplayInvoices', [
            'invoices' =>  TableSettingsServices::pagination(SellingInvoice::select(['*']), $request, 'invoices'),
            'tab' => 'selling_invoices'
        ]);
    }

    function create(Request $request)
    {

        return inertia()->render('invoices/selling_invoices/Create', [
            'invoice_number' => fn () => SellingInvoice::max('id') + 1,
            'stocks' => inertia()->lazy(
                function () use ($request) {
                    return  Stock::select(['id', 'name'])
                        ->where('name', 'like', '%' . $request->stock_name . '%')
                        ->get();
                }
            ),
            'product' => inertia()->lazy(
                function () use ($request) {
                    $attribute = $request->attribute;
                    $value = $request->value;
                    $stock_id = $request->stock_id;
                    if ($stock_id == null)
                        return 'ERR:يجب اختيار مخزن';
                    if ($attribute == null || $value == null)
                        return null;
                    // 1 - get the product
                    $product = Product::select(['id', 'name', 'barcode', 'selling_price', 'last_buying_price'])->where([$attribute => $value])->first();
                    if ($product == null)
                        return 'ERR:هذا المنتج غير موجود';
                    // 2 - get the sum of oldest stock item quantities in stock that has quantity > 0
                    $available_quantity = Box::where('product_id', $product->id)
                        ->join('stock_items', 'boxes.id', '=', 'stock_items.box_id')
                        ->where('stock_items.stock_id', $stock_id)
                        ->where('stock_items.quantity', '>', 0)
                        ->sum('stock_items.quantity');
                    if ($available_quantity == 0)
                        return 'ERR:لا يوجد كمية متاحة من هذا المنتج في المخزن المختار';
                    // 3 - append the available quantity to the product
                    $product->available_quantity = $available_quantity;
                    $product->append('available_quantity');
                    return $product;
                }
            ),
        ]);
    }

    function store(Request $request, SellingInvoiceServices $service)
    {
        $validated = $request->validate([
            'stock_id' => 'required|exists:stocks,id',
            'invoiceItems.*.product_id' => 'required|exists:products,id',
            'invoiceItems.*.quantity' => 'required|numeric',
        ]);


        $invoice_items = $service->buildInvoiceItems($request->stock_id, $validated['invoiceItems']);

        $total_cash = 0;
        foreach ($invoice_items as $item) {
            $total_cash += $item['selling_price'] * $item['quantity'];
        }

        $sellingInvoice = SellingInvoice::create([
            'stock_id' => $request->stock_id,
            'total_cash' => $total_cash,
        ]);

        $sellingInvoice->sellingInvoiceItems()->createMany($invoice_items);

        return redirect()->back()->with('success', 'تم اضافة فاتورة بيع بنجاح');
    }

    function show(SellingInvoice $invoice)
    {
        return inertia()->render('invoices/selling_invoices/Show', [
            'data' => $invoice->load(['sellingInvoiceItems.stockItem.box.product:id,name,barcode']),
        ]);
    }
}
