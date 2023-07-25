<?php

namespace App\Processes;


use App\Models\SellingInvoice;

class ReturnSellingInvoiceProcess
{
    private $_total_cost = 0;
    private $_selling_invoice_id;
    private $_invoice_items;
    private $_selling_invoice;
    private $_selling_invoice_items;
    private $_previeus_return_quantities;


    function __construct($data)
    {
        $this->setSellingInvoiceId($data['selling_invoice_id']);
        $this->setInvoiceItems($data['invoiceItems']);
        $this->loadSellingInvoiceData();
        $this->setTotalCost($data['invoiceItems']);
    }

    private function setSellingInvoiceId($id)
    {
        $this->_selling_invoice_id = $id;
    }

    private function loadSellingInvoiceData()
    {
        $this->_selling_invoice =
            SellingInvoice::with([
                'sellingInvoiceItems.stockItem.box',
                'returnSellingInvoices.items'
            ])
            ->where('id', '=', $this->_selling_invoice_id)
            ->first();

        $this->_selling_invoice_items = $this->_selling_invoice
            ->sellingInvoiceItems
            ->sortByDesc('id')
            ->groupBy('stockItem.box.product_id');

        $this->_previeus_return_quantities = $this->_selling_invoice
            ->returnSellingInvoices
            ->pluck('items')
            ->flatten(1)->groupBy('product_id')->map(function ($items) {
                return $items->sum('quantity');
            })->toArray();
    }

    private function getPrevieusReturnQuantity($product_id)
    {
        return $this->_previeus_return_quantities[$product_id] ?? 0;
    }

    private function setInvoiceItems($invoice_items)
    {
        $this->_invoice_items = collect($invoice_items);
    }

    private function getInvoiceItem($product_id)
    {
        return $this->_invoice_items->first(function ($item) use ($product_id) {
            return $item['product_id'] === $product_id;
        });
    }

    private function setTotalCost($invoice_items)
    {
        foreach ($invoice_items as $item) {
            $this->_total_cost += $item['return_price'] * $item['quantity'];
        }
    }

    function getTotalCost()
    {
        return $this->_total_cost;
    }

    function process()
    {
        foreach ($this->_selling_invoice_items as $product_id => $items) {

            $previous_return_quantity = $this->getPrevieusReturnQuantity($product_id);
            $return_quantity = $this->getInvoiceItem($product_id)['quantity'];
            $is_all_quantity_returned = false;

            foreach ($items as $invoice_item) {

                if ($is_all_quantity_returned) break;

                // discharge previous return quantity
                $previous_return_quantity = $this->updatePreviousReturnQuantity($previous_return_quantity, $invoice_item);
                if ($previous_return_quantity > 0) continue;


                $is_all_quantity_returned = $this->updateStockItemQuantity($return_quantity, $invoice_item);

                $invoice_item->stockItem->save();
            }
        }
    }

    private function updatePreviousReturnQuantity($previous_return_quantity, $invoice_item)
    {
        if ($previous_return_quantity >= $invoice_item->quantity) {
            $previous_return_quantity -= $invoice_item->quantity;
        } else {
            $previous_return_quantity = 0;
        }
        return $previous_return_quantity;
    }

    private function updateStockItemQuantity(&$return_quantity, $invoice_item)
    {
        if ($invoice_item->quantity >= $return_quantity) {
            $invoice_item->stockItem->quantity += $return_quantity;
            return true;
        }

        $invoice_item->stockItem->quantity += $invoice_item->quantity;
        $return_quantity -= $invoice_item->quantity;
        return false;
    }
}
