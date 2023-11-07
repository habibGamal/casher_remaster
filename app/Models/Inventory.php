<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function items()
    {
        return $this->hasMany(InventoryItem::class);
    }

    public function receiptsTo()
    {
        return $this->morphMany(Receipt::class, 'to');
    }

    public function receiptsFrom()
    {
        return $this->morphMany(Receipt::class, 'from');
    }


}
