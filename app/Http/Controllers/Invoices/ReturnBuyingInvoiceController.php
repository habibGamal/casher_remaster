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
        return inertia()->render('invoices/return_buying_invoices/CreateReturnBuyingInvoice', [
            'invoice_number' => ReturnBuyingInvoice::max('id') + 1,
            'buying_invoice' => inertia()->lazy(function () use ($request) {
                return BuyingInvoice::where('id', '=', $request->value)->with(['buyingInvoiceItems.stockItem.product:id,name,barcode'])->first();
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'buying_invoice_id' => 'required|exists:buying_invoices,id',
            'total_cash' => 'required|numeric',
            'invoiceItems.*.product_id' => 'required|exists:products,id',
            'invoiceItems.*.quantity' => 'required|numeric',
            'invoiceItems.*.return_price' => 'required|numeric',
            'invoiceItems.*.stock_item_id' => 'required|exists:stock_items,id',
        ]);
        $returnBuyingInvoice = ReturnBuyingInvoice::create($validated);

        $returnBuyingInvoice->returnBuyingInvoiceItems()->createMany($validated['invoiceItems']);

        foreach ($validated['invoiceItems'] as $item) {
            $stockItem = StockItem::find($item['stock_item_id']);
            $stockItem->update([
                'quantity' => $stockItem->quantity - $item['quantity'],
            ]);
        }

        return redirect()->back()->with('success', 'تم اضافة فاتورة مرتجع شراء بنجاح');
    }

    public function show(ReturnBuyingInvoice $invoice)
    {
        return inertia()->render('invoices/return_buying_invoices/ReturnBuyingInvoice', [
            'data' => $invoice->load(['returnBuyingInvoiceItems.product:id,name,barcode']),
        ]);
    }
}
