<?php

namespace App\Http\Controllers\Invoices;

use App\Http\Controllers\Controller;
use App\Models\BuyingInvoice;
use App\Models\Product;
use App\Models\Stock;
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
            'stocks' => Inertia::Lazy(
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

        $validatedInvoiceItems = $request->validate([
            /// check product in database will consume time
            'invoiceItems.*.product_id' => 'required|exists:products,id',
            'invoiceItems.*.quantity' => 'required|numeric',
            'invoiceItems.*.buying_price' => 'required|numeric',
        ]);

        // create invoice
        $invoice = BuyingInvoice::create($validatedInvoice);

        // get stock
        $stock = Stock::find($request->stock_id);

        // create stock items
        $stockItems = $stock->stockItems()->createMany($validatedInvoiceItems['invoiceItems']);

        // update last_buying_price in product table
        $stockItems->each(function ($stockItem) {
            $stockItem->product()->update([
                'last_buying_price' => $stockItem->buying_price,
            ]);
        });

        // extact invoice items data
        $invoiceItemsData = $stockItems->map(function ($stockItem) {
            return [
                'stock_item_id' => $stockItem->id,
                'quantity' => $stockItem->quantity,
            ];
        });

        // create invoice items
        $invoice->buyingInvoiceItems()->createMany($invoiceItemsData);

        return redirect()->back()->with('success', 'تمت العملية بنجاح');
    }

    public function show(BuyingInvoice $invoice)
    {
        return inertia()->render('invoices/buying_invoices/Show', [
            'data' => $invoice->load(['buyingInvoiceItems.stockItem:id,product_id,buying_price', 'buyingInvoiceItems.stockItem.product:id,name,barcode']),
        ]);
    }
}
