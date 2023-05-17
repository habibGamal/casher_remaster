<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $fillable = [
        'name',
        'barcode',
        'last_buying_price',
        'selling_price',
        'minimum_stock',
        'has_expire_date',
        'unit_or_weight',
        'unit',
        'product_group_id',
    ];


    public function setAvailableQuantityAttribute($value)
    {
        $this->attributes['available_quantity'] = $value;
    }

    public function getAvailableQuantityAttribute()
    {
        if (isset($this->attributes['available_quantity']))
            return $this->attributes['available_quantity'];
    }

    public function productGroup()
    {
        return $this->belongsTo(ProductGroup::class);
    }

    public function stockItems()
    {
        return $this->hasMany(StockItem::class);
    }
}
