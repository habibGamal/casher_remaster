<?php

namespace App\Http\Controllers\Invoices;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\SellingInvoice;
use App\Models\Stock;
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
                    $available_quantity = Stock::find($stock_id)->stockItems()->where('product_id', $product->id)->where('quantity', '>', 0)->orderBy('created_at', 'asc')->sum('quantity');
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

    function store(Request $request)
    {
        $validated = $request->validate([
            'stock_id' => 'required|exists:stocks,id',
            'invoiceItems.*.product_id' => 'required|exists:products,id',
            'invoiceItems.*.quantity' => 'required|numeric',
        ]);
        $stock = Stock::find($validated['stock_id']);
        if ($stock == null)
            return redirect()->back()->with('error', 'هذا المخزن غير موجود');
        $invoice_items = [];
        foreach ($validated['invoiceItems'] as $item) {
            $invoice_item = [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'selling_price' => Product::find($item['product_id'])->selling_price,
                'buying_price' => 0 // it will be updated later,
            ];
            $stockItems =  $stock->stockItems()->where('product_id', $item['product_id'])->where('quantity', '>', 0)->orderBy('created_at', 'asc')->get();
            if ($stockItems->sum('quantity') < $item['quantity'])
                return redirect()->back()->with('error', 'لا يوجد كمية متاحة من هذا المنتج في المخزن المختار');

            $required_quantity = $item['quantity'];
            $stockItems->each(function ($stockItem) use ($item, &$invoice_item, $required_quantity) {
                if ($item['quantity'] > 0) {
                    if ($stockItem->quantity >= $item['quantity']) {
                        $stockItem->quantity -= $item['quantity'];
                        $invoice_item['buying_price'] += $stockItem->buying_price * ($item['quantity'] / $required_quantity);
                        $stockItem->save();
                        $item['quantity'] = 0;
                    } else {
                        $item['quantity'] -= $stockItem->quantity;
                        $invoice_item['buying_price'] += $stockItem->buying_price * ($stockItem->quantity / $required_quantity);
                        $stockItem->quantity = 0;
                        $stockItem->save();
                    }
                }
            });
            $invoice_items[] = $invoice_item;
        }

        $total_cost = 0;
        $total_cash = 0;
        foreach ($invoice_items as $item) {
            $total_cost += $item['buying_price'] * $item['quantity'];
            $total_cash += $item['selling_price'] * $item['quantity'];
        }

        $sellingInvoice = SellingInvoice::create([
            'total_cost' => $total_cost,
            'total_cash' => $total_cash,
        ]);

        $sellingInvoice->sellingInvoiceItems()->createMany($invoice_items);

        return redirect()->back()->with('success', 'تم اضافة فاتورة بيع بنجاح');
    }

    function show(SellingInvoice $invoice)
    {
        return inertia()->render('invoices/selling_invoices/Show', [
            'data' => $invoice->load(['sellingInvoiceItems.product:id,name,barcode']),
        ]);
    }
}
