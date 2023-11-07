<?php

namespace App\DTO;

class ReceiptItemDTO extends DTO
{

    public int $receipt_id;
    public int $product_id;
    public float $quantity;
    public float $cost;
    public float $price;
    public float $tax;
    public float $total;
    public ?string $expiry_date;

    public function __construct(int $receipt_id, int $product_id, float $quantity, float $cost, float $price, float $tax, float $total, ?string $expiry_date)
    {
        $this->receipt_id = $receipt_id;
        $this->product_id = $product_id;
        $this->quantity = $quantity;
        $this->cost = $cost;
        $this->price = $price;
        $this->tax = $tax;
        $this->total = $total;
        $this->expiry_date = $expiry_date;
    }

    static public function fromArray(array $data)
    {
        return new self(
            $data['receipt_id'],
            $data['product_id'],
            $data['quantity'],
            $data['cost'],
            $data['price'],
            $data['tax'],
            $data['total'],
            $data['expiry_date'],
        );
    }
}
