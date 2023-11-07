<?php

namespace App\DTO;

class PosItemDTO extends DTO
{

    public $pos_id;
    public $product_id;
    public $quantity;
    public $expiry_dates;

    public function __construct($inventory_id, $product_id, $quantity, $expiry_date)
    {
        $this->pos_id = $inventory_id;
        $this->product_id = $product_id;
        $this->quantity = $quantity;
        $this->expiry_dates = $expiry_date;
    }

    public static function fromArray(array $array)
    {
        return new self(
            $array['inventory_id'],
            $array['product_id'],
            $array['quantity'],
            $array['expiry_dates'],
        );
    }
}
