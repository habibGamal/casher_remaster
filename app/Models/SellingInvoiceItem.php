<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellingInvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'selling_invoice_id',
        'product_id',
        'quantity',
        'buying_price',
        'selling_price',
    ];

    public function sellingInvoice()
    {
        return $this->belongsTo(SellingInvoice::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
