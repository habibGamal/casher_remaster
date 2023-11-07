<?php

namespace App\GraphQL\Queries;

final class Greet
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        return $args['name'] . 'welcom';
    }
}
