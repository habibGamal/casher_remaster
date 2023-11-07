<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppConfigs extends Model
{
    use HasFactory;

    const SCANNER_CODE = 'scanner_code';
    const DNS = 'dns';

    protected $fillable = [
        'key',
        'value',
    ];
}
