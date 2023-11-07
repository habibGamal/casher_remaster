<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;


    protected $fillable =  [
        'inventory_id',
        'product_id',
        'quantity',
        'expiry_date',
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}
