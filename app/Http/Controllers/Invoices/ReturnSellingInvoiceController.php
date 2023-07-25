<?php

namespace App\Http\Controllers\Invoices;

use App\Http\Controllers\Controller;
use App\Models\ReturnSellingInvoice;
use App\Models\SellingInvoice;
use App\Services\ReturnSellingInvoiceServices;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class ReturnSellingInvoiceController extends Controller
{

    public function index(Request $request)
    {
        return inertia()->render('invoices/DisplayInvoices', [
            'invoices' => TableSettingsServices::pagination(ReturnSellingInvoice::select('*'), $request, 'invoices'),
            'tab' => 'return_selling_invoices'
        ]);
    }

    public function create(Request $request)
    {
        return inertia()->render('invoices/return_selling_invoices/Create', [
            'invoice_number' => ReturnSellingInvoice::max('id') + 1,
            'selling_invoice' => inertia()->lazy(function () use ($request) {
                return SellingInvoice::where('id', '=', $request->value)
                    ->with([
                        'sellingInvoiceItems.stockItem.box.product:id,name,barcode',
                        'returnSellingInvoices.items'
                    ])
                    ->first();
            }),
        ]);
    }

    public function store(Request $request, ReturnSellingInvoiceServices $service)
    {
        $validated = $request->validate([
            'selling_invoice_id' => 'required|exists:selling_invoices,id',
            'invoiceItems.*.product_id' => 'required|exists:products,id',
            'invoiceItems.*.quantity' => 'required|numeric',
            'invoiceItems.*.return_price' => 'required|numeric',
        ]);

        $total_cost = $service->processReturnInvoice($validated);
        $validated['total_cost'] = $total_cost;

        $returnSellingInvoice = ReturnSellingInvoice::create($validated);
        $returnSellingInvoice->items()->createMany(
            $validated['invoiceItems']
        );

        return redirect()->back()->with('success', 'تم اضافة فاتورة مرتجع بيع بنجاح');
    }

    public function show(ReturnSellingInvoice $invoice)
    {
        // dd($invoice->load(['items.product:id,name,barcode'])->toArray());
        // exit;
        return inertia()->render('invoices/return_selling_invoices/Show', [
            'data' => $invoice->load(['items.product:id,name,barcode']),
        ]);
    }
}
