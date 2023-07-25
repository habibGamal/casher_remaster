<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellingInvoice extends Model
{
    use HasFactory;

    public $fillable = [
        'stock_id',
        'total_cash'
    ];

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }

    public function sellingInvoiceItems()
    {
        return $this->hasMany(SellingInvoiceItem::class);
    }

    public function returnSellingInvoices()
    {
        return $this->hasMany(ReturnSellingInvoice::class);
    }

}
