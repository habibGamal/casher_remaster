<?php

if (!function_exists('partialError')) {
    function partialError($msg)
    {
        return 'ERR: ' . $msg;
    }
}
