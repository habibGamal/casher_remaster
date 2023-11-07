<?php

namespace App\DTO;

class InventoryItemDTO extends DTO
{

    public $inventory_id;
    public $product_id;
    public $quantity;
    public $expiry_date;

    public function __construct($inventory_id, $product_id, $quantity, $expiry_date)
    {
        $this->inventory_id = $inventory_id;
        $this->product_id = $product_id;
        $this->quantity = $quantity;
        $this->expiry_date = $expiry_date;
    }

    public static function fromArray(array $array)
    {
        return new self(
            $array['inventory_id'],
            $array['product_id'],
            $array['quantity'],
            $array['expiry_date'],
        );
    }
}
