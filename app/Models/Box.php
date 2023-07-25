<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Box extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'buying_price',
    ];

    public $timestamps = false;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function stockItems()
    {
        return $this->hasMany(StockItem::class);
    }

    public function getQuantityAttribute()
    {
        return $this->stockItems()->sum('quantity');
    }

}
