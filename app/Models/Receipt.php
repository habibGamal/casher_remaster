<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;


    protected $fillable = [
        'from_id',
        'to_id',
        'from_type',
        'to_type',
        'session_id',
    ];

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function from()
    {
        return $this->morphTo(__FUNCTION__, 'from_id', 'from_type');
    }

    public function to()
    {
        return $this->morphTo(__FUNCTION__, 'to_id', 'to_type');
    }

    public function items()
    {
        return $this->hasMany(ReceiptItem::class);
    }

    static private function createFromTo($from, $to, $attributes)
    {
        $attributes['from_type'] = $from;
        $attributes['to_type'] = $to;
        return static::create($attributes);
    }

    static function createPurchaseInvoice($attributes)
    {
        return static::createFromTo(Supplier::class, Inventory::class, $attributes);
    }

    static function createReturnPurchaseInvoice($attributes)
    {
        return static::createFromTo(Inventory::class, Supplier::class, $attributes);
    }

    private function scopeFromTo(Builder $query, $from, $to)
    {
        return $query->where('from_type', $from)->where('to_type', $to);
    }

    public function scopePurchaseInvoices(Builder $query)
    {
        return $this->scopeFromTo($query, Supplier::class, Inventory::class);
    }

    public function scopeReturnPurchaseInvoices(Builder $query)
    {
        return $this->scopeFromTo($query, Inventory::class, Supplier::class);
    }
}
