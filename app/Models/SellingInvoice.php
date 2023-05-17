<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellingInvoice extends Model
{
    use HasFactory;

    public $fillable = [
        'total_cost',
        'total_cash'
    ];


    public function sellingInvoiceItems()
    {
        return $this->hasMany(SellingInvoiceItem::class);
    }

}
