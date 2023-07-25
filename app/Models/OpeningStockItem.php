<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpeningStockItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'box_id',
        'buying_price',
    ];

    public function stockItem()
    {
        return $this->hasOneThrough(
            StockItem::class,
            Box::class,
        );
    }


}
