<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpeningStockItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_item_id',
        'buying_price',
    ];

    public function stockItem()
    {
        return $this->belongsTo(StockItem::class);
    }


}
