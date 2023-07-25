<?php

namespace App\Services;

use App\Processes\ReturnSellingInvoiceProcess;

class ReturnSellingInvoiceServices
{

    function processReturnInvoice($data)
    {
        $returnProcess = new ReturnSellingInvoiceProcess($data);
        $returnProcess->process();
        return $returnProcess->getTotalCost();
    }
}
