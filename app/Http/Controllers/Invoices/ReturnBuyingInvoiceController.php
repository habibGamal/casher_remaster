<?php

namespace App\Http\Controllers\Invoices;

use App\Http\Controllers\Controller;
use App\Models\BuyingInvoice;
use App\Models\ReturnBuyingInvoice;
use App\Models\StockItem;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class ReturnBuyingInvoiceController extends Controller
{
    public function index(Request $request)
    {
        return inertia()->render('invoices/DisplayInvoices', [
            'invoices' => TableSettingsServices::pagination(ReturnBuyingInvoice::select('*'), $request, 'invoices'),
            'tab' => 'return_buying_invoices'
        ]);
    }

    public function create(Request $request)
    {
        return inertia()->render('invoices/return_buying_invoices/Create', [
            'invoice_number' => ReturnBuyingInvoice::max('id') + 1,
            'buying_invoice' => inertia()->lazy(function () use ($request) {
                return BuyingInvoice::where('id', '=', $request->value)->with(['buyingInvoiceItems.box.stockItems.stock', 'buyingInvoiceItems.box.product:id,name,barcode'])->first();
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'buying_invoice_id' => 'required|exists:buying_invoices,id',
            'invoiceItems.*.product_id' => 'required|numeric|exists:products,id',
            'invoiceItems.*.quantity' => 'required|numeric',
            'invoiceItems.*.return_price' => 'required|numeric',
            'invoiceItems.*.stock_item_id' => 'required|exists:stock_items,id',
        ]);

        $invoiceItems = collect($validated['invoiceItems']);

        $total_cash = $invoiceItems->sum(function ($item) {
            return $item['quantity'] * $item['return_price'];
        });

        $returnBuyingInvoice = ReturnBuyingInvoice::create([
            'buying_invoice_id' => $validated['buying_invoice_id'],
            'total_cash' => $total_cash,
        ]);

        $returnBuyingInvoice->returnBuyingInvoiceItems()->createMany($validated['invoiceItems']);

        $invoiceItems->each(function ($item) {
            $stockItem = StockItem::find($item['stock_item_id']);
            $stockItem->update([
                'quantity' => $stockItem->quantity - $item['quantity'],
            ]);
        });

        return redirect()->back()->with('success', 'تم اضافة فاتورة مرتجع شراء بنجاح');
    }

    public function show(ReturnBuyingInvoice $invoice)
    {
        return inertia()->render('invoices/return_buying_invoices/Show', [
            'data' => $invoice->load(['returnBuyingInvoiceItems.product:id,name,barcode']),
        ]);
    }
}
