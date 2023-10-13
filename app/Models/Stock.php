<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    public $fillable = [
        'name'
    ];

    public function stockItems()
    {
        return $this->hasMany(StockItem::class, 'stock_id');
    }
}
