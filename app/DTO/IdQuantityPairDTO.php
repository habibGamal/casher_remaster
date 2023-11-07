<?php

namespace App\DTO;

class IdQuantityPairDTO extends DTO
{

    public $id;
    public $quantity;

    public function __construct($id, $quantity)
    {
        $this->id = $id;
        $this->quantity = $quantity;
    }

    public static function fromArray(array $array)
    {
        return new self(
            $array['id'],
            $array['quantity'],
        );
    }

}
