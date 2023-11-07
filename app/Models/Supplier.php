<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'phone',
    ];

    public function debits()
    {
        return $this->hasMany(Debit::class);
    }

    public function receiptsFrom()
    {
        return $this->morphMany(Receipt::class, 'from');
    }

    public function receiptsTo()
    {
        return $this->morphMany(Receipt::class, 'to');
    }


}
