<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyingInvoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_cost',
    ];


    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d h:i:s A'); // use a different format for the created_at attribute
    }

    public function buyingInvoiceItems()
    {
        return $this->hasMany(BuyingInvoiceItem::class);
    }

}
