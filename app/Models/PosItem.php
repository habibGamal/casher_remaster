<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PosItem extends Model
{
    use HasFactory;



    protected $fillable = [
        'pos_id',
        'product_id',
        'quantity',
        'expiry_dates',
    ];

    public function pos()
    {
        return $this->belongsTo(Pos::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }




}
