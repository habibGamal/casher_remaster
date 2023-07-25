<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyingInvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'buying_invoice_id',
        'box_id',
        'quantity',
    ];

    public function buyingInvoice()
    {
        return $this->belongsTo(BuyingInvoice::class);
    }


    public function box()
    {
        return $this->belongsTo(Box::class);
    }

}
