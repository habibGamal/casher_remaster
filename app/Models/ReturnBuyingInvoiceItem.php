<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnBuyingInvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'return_buying_invoice_id',
        'quantity',
        'return_price',
    ];


    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function returnBuyingInvoice()
    {
        return $this->belongsTo(ReturnBuyingInvoice::class);
    }



}
