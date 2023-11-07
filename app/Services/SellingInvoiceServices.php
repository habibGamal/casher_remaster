<?php

namespace App\Services;


use App\Processes\SellingInvoiceProcess;

class SellingInvoiceServices
{
    function processSellingInvoice($data)
    {
        $sellingProcess = new SellingInvoiceProcess($data);
        $sellingProcess->process();
        return $sellingProcess->sellingInvoiceItems();
    }
}
