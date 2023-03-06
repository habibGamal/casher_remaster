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
        'buying_price',
        'selling_price',
        'minimum_stock',
        'has_expire_date',
        'unit_or_weight',
        'unit',
        'product_group_id',
    ];

    public function productGroup()
    {
        return $this->belongsTo(ProductGroup::class);
    }
}
