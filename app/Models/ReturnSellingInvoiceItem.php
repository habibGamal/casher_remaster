<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnSellingInvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'return_selling_invoice_id',
        'product_id',
        'quantity',
        'return_price',
    ];

    public function returnSellingInvoice()
    {
        return $this->belongsTo(ReturnSellingInvoice::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
