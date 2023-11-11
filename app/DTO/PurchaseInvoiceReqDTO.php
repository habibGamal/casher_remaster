<?php

namespace App\DTO;

class PurchaseInvoiceItemDTO extends DTO
{
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
    public $session_id;



    /**
     * @var PurchaseInvoiceItemDTO[]
     */
    public $items;

    /**
     * @var PaymentDTO
     */
    public $payment;
    public function __construct($supplier_id, $inventory_id, $session_id, $items, $payment)
    {
        $this->supplier_id = $supplier_id;
        $this->inventory_id = $inventory_id;
        $this->session_id = $session_id;
        $this->items = $items;
        $this->payment = $payment;
    }

    static public function fromArray(array $data)
    {
        $items = [];
        foreach ($data['items'] as $item) {
            $items[] = PurchaseInvoiceItemDTO::fromArray($item);
        }
        $payment = PaymentDTO::fromArray($data['payment']);
        return new self(
            $data['supplier_id'],
            $data['inventory_id'],
            $data['session_id'],
            $items,
            $payment,
        );
    }
}
