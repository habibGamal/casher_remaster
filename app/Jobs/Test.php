<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class Test implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        DB::table('students')->insert([
            'firstName' => '1habib',
            'secondName'=>'test',
            'phone'=>'test',
            'birthday'=>'2022-11-13',
            'gender'=>'male',
            'country'=>'test',
            'firstLanguage'=>'test',
            'secondLanguage'=>'test',
            'level'=>'beginner',
        ]);
    }
}
