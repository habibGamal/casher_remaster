<?php

namespace App\Services\Receipts;

use App\DTO\PurchaseInvoiceReqDTO;
use App\DTO\ReceiptItemDTO;
use App\Models\Product;
use App\Models\Receipt;

class PurchaseInvoiceServices
{

    /**
     * @param PurchaseInvoiceReqDTO $req
     * @return ReceiptItem[]
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
     */
    function createReceipt($req)
    {
        $receipt = Receipt::createPurchaseInvoice($req->supplier_id, $req->inventory_id, [
            'session_id' => 1,
        ]);
        $receipt_items = $this->constructReceiptItems($req, $receipt->id);
        $receipt->items()->createMany(collect($receipt_items)->toArray());
    }
}
