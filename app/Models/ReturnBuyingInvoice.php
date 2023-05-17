<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnBuyingInvoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_cash',
        'buying_invoice_id',
    ];

    public function buyingInvoice()
    {
        return $this->belongsTo(BuyingInvoice::class);
    }

    public function returnBuyingInvoiceItems()
    {
        return $this->hasMany(ReturnBuyingInvoiceItem::class);
    }
}
