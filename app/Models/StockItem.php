<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'quantity',
        'stock_id',
        'box_id',
    ];

    public $timestamps = false;

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }

    public function box()
    {
        return $this->belongsTo(Box::class);
    }
}
