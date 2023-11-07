<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Render\StockRender;
use App\Services\TableSettingsServices;
use Illuminate\Http\Request;

class StockController extends Controller
{

    public function index()
    {
        return inertia()->render(
            'RenderSuiteTableData',
            (new StockRender)->render(),
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:stocks,name',
        ]);

        Stock::create($request->all());

        return redirect()->route('stocks.index');
    }

    public function update(Request $request, Stock $stock)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:stocks,name',
        ]);

        $stock->update($request->all());

        return redirect()->route('stocks.index');
    }

    public function destroy(Stock $stock)
    {
        $stock->delete();

        return redirect()->route('stocks.index');
    }
}
