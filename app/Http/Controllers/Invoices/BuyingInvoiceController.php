<?php

namespace App\Http\Controllers\Invoices;

use App\Http\Controllers\Controller;
use App\Models\Box;
use App\Models\BuyingInvoice;
use App\Models\Product;
use App\Models\Stock;
use App\Models\StockItem;
use App\Services\TableSettingsServices;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BuyingInvoiceController extends Controller
{
    public function index(Request $request)
    {
        return inertia()->render('invoices/DisplayInvoices', [
            'invoices' =>  TableSettingsServices::pagination(BuyingInvoice::select(['*']), $request, 'invoices'),
            'tab' => 'buying_invoices'
        ]);
    }

    public function create(Request $request)
    {
        return inertia()->render('invoices/buying_invoices/Create', [
            'stocks' => inertia()->lazy(
                function () use ($request) {
                    return  Stock::select(['id', 'name'])
                        ->where('name', 'like', '%' . $request->stock_name . '%')
                        ->get();
                }
            ),
            'invoice_number' => fn () => BuyingInvoice::max('id') + 1,
            'product' => inertia()->lazy(function () use ($request) {
                return Product::select(['id', 'name', 'barcode', 'last_buying_price'])->where([$request->attribute => $request->value])->first();
            })
        ]);
    }

    public function store(Request $request)
    {
        if ($request->stock_id == null)
            return redirect()->back()->with('error', 'برجاء اختيار المخزن');

        $validatedInvoice = $request->validate([
            'total_cost' => 'required|numeric',
        ]);

        $validated_invoice_items = $request->validate([
            /// check product in database will consume time
            'stock_id' => 'required|exists:stocks,id',
            'invoiceItems.*.product_id' => 'required|exists:products,id',
            'invoiceItems.*.quantity' => 'required|numeric',
            'invoiceItems.*.buying_price' => 'required|numeric',
        ]);

        // create invoice
        $invoice = BuyingInvoice::create($validatedInvoice);

        // create boxes and stock items
        $invoice_items = collect($validated_invoice_items['invoiceItems']);
        $buying_invoice_items_data = collect();
        $invoice_items->each(function ($item) use ($buying_invoice_items_data) {
            $box = Box::create($item);
            $box->stockItems()->create([
                'stock_id' => request()->stock_id,
                'quantity' => $item['quantity'],
            ]);

            // update last_buying_price in product table
            $box->product()->update([
                'last_buying_price' => $box->buying_price,
            ]);

            $buying_invoice_items_data->push([
                'box_id' => $box->id,
                'quantity' => $item['quantity'],
            ]);
        });

        // create invoice items
        $invoice->buyingInvoiceItems()->createMany($buying_invoice_items_data);

        return redirect()->back()->with('success', 'تمت العملية بنجاح');
    }

    public function show(BuyingInvoice $invoice)
    {
        return inertia()->render('invoices/buying_invoices/Show', [
            'data' => $invoice->load(['buyingInvoiceItems.box' => [
                'product:id,name,barcode',
            ]]),
        ]);
    }
}
