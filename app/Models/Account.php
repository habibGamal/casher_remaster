<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'type',
        'balance',
        'client_id',
        'client_type',
    ];

    public function client()
    {
        return $this->morphTo(__FUNCTION__, 'client_type', 'client_id');
    }

}
