<?php

namespace App\Http\Controllers;

use App\Models\AppConfigs;
use Illuminate\Support\Facades\Artisan;

class SettingsController extends Controller
{
    function index(): \Inertia\Response
    {
        $dns = AppConfigs::firstOrCreate(
            ['key' => AppConfigs::DNS],
            ['value' => '']
        );
        return inertia()->render('Settings', [
            'dns' => $dns->value,
        ]);
    }

    function truncateDatabase(): \Illuminate\Http\RedirectResponse
    {
        Artisan::call('migrate:fresh');
        return redirect()->back();
    }

    function command(string $command)
    {
        switch ($command) {
            case 'truncate-database':
                return $this->truncateDatabase();
        }
    }

    function updateDNS(): \Illuminate\Http\RedirectResponse
    {
        $dns = AppConfigs::where('key', AppConfigs::DNS)->first();
        $dns->value = request()->value;
        $dns->save();
        return redirect()->back();
    }
}
