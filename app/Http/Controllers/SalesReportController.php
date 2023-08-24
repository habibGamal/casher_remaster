<?php

namespace App\Http\Controllers;

use App\Processes\BuildSalesReportProcess;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{
    function index(Request $request)
    {
        return inertia()->render('reports/SalesReport', [
            // 'data' => inertia()->lazy(function () use ($request) {
            //     // if($request->preiod == null) return partialError('Please select a period');
            //     return (new BuildSalesReportProcess('2023-8-1 - 2023-8-24'))->process();
            // }),
            'data' => function () use ($request) {
                // if($request->preiod == null) return partialError('Please select a period');
                return (new BuildSalesReportProcess('2023-08-20 - 2023-08-24'))->process();
            },
        ]);
    }
}
