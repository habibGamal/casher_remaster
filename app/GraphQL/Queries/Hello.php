<?php

namespace App\GraphQL\Queries;

use App\Models\User;

final class Hello
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return User::find(1)->email;
    }
}
