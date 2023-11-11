<?php

namespace App\DTO;


class PaymentDTO extends DTO
{
    public $method;
    public $paid;
    public $discount;
    public $notes;

    public function __construct($method, $paid, $discount = 0, $notes = null)
    {
        $this->method = $method;
        $this->paid = $paid;
        $this->discount = $discount;
        $this->notes = $notes;
    }

    static public function fromArray(array $data)
    {
        return new self(
            $data['method'],
            $data['paid'],
            $data['discount'],
            $data['notes'],
        );
    }
}
