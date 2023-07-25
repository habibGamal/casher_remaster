<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnSellingInvoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'selling_invoice_id',
        'total_cost',
    ];

    public function sellingInvoice()
    {
        return $this->belongsTo(SellingInvoice::class);
    }

    public function items()
    {
        return $this->hasMany(ReturnSellingInvoiceItem::class);
    }

}
