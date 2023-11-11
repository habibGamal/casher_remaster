<?php

namespace App\Services\Receipts;

use App\DTO\InventoryItemDTO;
use App\DTO\PurchaseInvoiceReqDTO;
use App\DTO\ReceiptItemDTO;
use App\Models\Account;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Receipt;
use App\Models\Supplier;
use App\Services\InventoryServices;



class PurchaseInvoiceServices
{

    /**
     * @param PurchaseInvoiceReqDTO $req
     */
    function createReceipt($req)
    {
        $receipt = Receipt::createPurchaseInvoice([
            'from_id' => $req->supplier_id,
            'to_id' => $req->inventory_id,
            'session_id' => $req->session_id,
        ]);
        $receipt_items = $this->constructReceiptItems($req, $receipt->id);
        $receipt_items_array = dtoToArrayDeep($receipt_items->toArray());
        $receipt->items()->createMany($receipt_items_array);
        $this->processPayment($req, $receipt_items, $receipt->id);
        $this->sideEffect($req->inventory_id, $receipt_items);
    }

    /**
     * @param PurchaseInvoiceReqDTO $req
     * @param int $receipt_id
     * @return Illuminate\Support\Collection<ReceiptItemDTO>
     */
    private function constructReceiptItems($req, $receipt_id)
    {
        $items = collect($req->items);

        $product_ids = $items->pluck('product_id')->toArray();

        $products = Product::select(['id', 'cost'])->whereIn('id', $product_ids)->get();
        return $items->map(function ($item) use ($receipt_id, $products) {
            $cost = $products->where('id', $item->product_id)->first()->cost;
            return new ReceiptItemDTO(
                $receipt_id,
                $item->product_id,
                $item->quantity,
                $cost,
                price: 0,
                tax: 0,
                total: $item->quantity * $cost,
                expiry_date: $item->expiry_date,
            );
        });
    }

    /**
     * @param PurchaseInvoiceReqDTO $req
     * @param Illuminate\Support\Collection<ReceiptItemDTO> $items
     * @param int $receipt_id
     * @return Payment
     */
    private function processPayment($req, $items, $receipt_id)
    {
        $payment = $req->payment;
        $subtotal = $items->sum('total');
        $tax = 0;
        $total = $subtotal + $tax - $payment->discount;
        $paid = $this->processPaidAmount($req->supplier_id, $payment->paid, $total);

        return Payment::create([
            'receipt_id' => $receipt_id,
            'method' => $payment->method,
            'type' => 'out',
            'subtotal' => $subtotal,
            'discount' => $payment->discount,
            'tax' => $tax,
            'total' => $total,
            'paid' => $paid,
            'margin_profit' => 0,
            'notes' => $payment->notes,
        ]);
    }

    private function processPaidAmount(int $supplier_id, float $paid, float $total)
    {
        if ($paid > $total)
            return $total;
        else {
            Account::updateOrCreate([
                'client_id' => $supplier_id,
                'client_type' => Supplier::class,
            ], [
                'type' => 'debit',
                'balance' => $total - $paid,
            ]);
            return $paid;
        }
    }

    /**
     * @param int $inventory_id
     * @param Illuminate\Support\Collection<ReceiptItemDTO> $items
     * @return void
     */
    private function sideEffect($inventory_id, $items)
    {
        $inventory_items = $this->constructInventoryItems($inventory_id, $items);
        $inventory_services = new InventoryServices();
        $inventory_services->addItemsToInventory($inventory_items);
    }

    /**
     * @param int $inventory_id
     * @param Illuminate\Support\Collection<ReceiptItemDTO> $items
     * @return Illuminate\Support\Collection<InventoryItemDTO>
     */
    private function constructInventoryItems($inventory_id, $items)
    {
        return $items->map(function ($item) use ($inventory_id) {
            return new InventoryItemDTO(
                $inventory_id,
                $item->product_id,
                $item->quantity,
                $item->expiry_date,
            );
        });
    }
}
