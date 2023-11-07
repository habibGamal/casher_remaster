<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceiptItem extends Model
{
    use HasFactory;


    protected $fillable = [
        'receipt_id',
        'product_id',
        'quantity',
        'cost',
        'price',
        'tax',
        'total',
        'expiry_date',
    ];

    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
