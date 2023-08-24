<?php

namespace App\GraphQL\Queries;

final class TestConnection
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return 'Connected to GraphQL';
    }
}
