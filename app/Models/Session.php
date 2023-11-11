<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'start_cash',
        'end_cash',
        'deficit',
        'is_closed',
        'opened_at',
        'closed_at',
        'notes',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
