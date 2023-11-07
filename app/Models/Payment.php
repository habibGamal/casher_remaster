<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;



    protected $fillable = [
        'receipt_id',
        'method',
        'type',
        'subtotal',
        'discount',
        'tax',
        'total',
        'paid',
        'margin_profit',
        'notes',
    ];

    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }
}
