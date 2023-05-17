<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class StockController extends Controller
{
    private $index = 'stocks/Stocks';

    public function index(Request $request)
    {
        return inertia()->render($this->index, [
            'stocks' =>  fn () => TableSettingsServices::pagination(Stock::select(['*']), $request, 'stocks'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Stock::create($request->all());

        return redirect()->route('stocks.index');
    }

    public function update(Request $request, Stock $stock)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $stock->update($request->all());

        return redirect()->route('stocks.index');
    }

    public function delete(Stock $stock)
    {
        $stock->delete();

        return redirect()->route('stocks.index');
    }
}
