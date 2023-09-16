<?php

namespace App\GraphQL\Mutations;

final class Logout
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        try {
            request()->user()->currentAccessToken()->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
