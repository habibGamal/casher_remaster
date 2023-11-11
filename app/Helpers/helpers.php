<?php

use App\DTO\DTO;

if (!function_exists('partialError')) {
    function partialError($msg)
    {
        return 'ERR: ' . $msg;
    }
}

if (!function_exists('dtoToArrayDeep')) {
    /**
     * @param DTO[] $dto
     */
    function dtoToArrayDeep($dtos)
    {
        return array_map(function ($dto) {
            return $dto->toArray();
        }, $dtos);
    }
}
