<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellingInvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'selling_invoice_id',
        'stock_item_id',
        'quantity',
        'selling_price',
    ];

    public function sellingInvoice()
    {
        return $this->belongsTo(SellingInvoice::class);
    }

    public function stockItem()
    {
        return $this->belongsTo(StockItem::class);
    }

}
