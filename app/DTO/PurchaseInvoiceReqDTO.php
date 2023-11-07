<?php

namespace App\DTO;

class PurchaseInvoiceItem {
    public $product_id;
    public $quantity;
    public $expiry_date;

    public function __construct($product_id, $quantity, $expiry_date = null)
    {
        $this->product_id = $product_id;
        $this->quantity = $quantity;
        $this->expiry_date = $expiry_date;
    }

    static public function fromArray(array $data)
    {
        return new self(
            $data['product_id'],
            $data['quantity'],
            $data['expiry_date'],
        );
    }
}

class PurchaseInvoiceReqDTO extends DTO
{
    public $supplier_id;
    public $inventory_id;

    /**
     * @var PurchaseInvoiceItem[]
     */
    public $items;

    public function __construct($supplier_id, $inventory_id, $items)
    {
        $this->supplier_id = $supplier_id;
        $this->inventory_id = $inventory_id;
        $this->items = $items;
    }

    static public function fromArray(array $data)
    {
        $items = [];
        foreach ($data['items'] as $item) {
            $items[] = PurchaseInvoiceItem::fromArray($item);
        }
        return new self(
            $data['supplier_id'],
            $data['inventory_id'],
            $items,
        );
    }

}
