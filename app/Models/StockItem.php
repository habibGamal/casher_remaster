<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'price',
        'expiration_date',
        'stock_id',
        'product_id',
    ];

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function openingStockItem()
    {
        return $this->hasOne(OpeningStockItem::class);
    }
}
