<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Services\StockServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    private $index = 'stocks/Stocks';
    public function index(Request $request, StockServices $stockServices){
        return Inertia::render($this->index, [
            'stocks' =>  fn () => $stockServices->get_stocks($request, 'stocks'),
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $stock = Stock::create($request->all());

        return redirect()->route('stocks.index');
    }

    public function update(Request $request, Stock $stock){
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $stock->update($request->all());

        return redirect()->route('stocks.index');
    }

    public function delete(Stock $stock){
        $stock->delete();

        return redirect()->route('stocks.index');
    }
}
