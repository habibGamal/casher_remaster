<?php

if (!function_exists('partialError')) {
    function partialError($msg)
    {
        return 'Err: ' . $msg;
    }
}
