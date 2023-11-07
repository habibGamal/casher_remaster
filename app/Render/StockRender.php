<?php

namespace App\Render;

use App\Models\Stock;
use App\Utilities\RenderSuiteTableDataConfig;
use App\Utilities\TableFormater;

class StockRender
{
    private $renderConfig;
    function __construct()
    {
        $this->renderConfig = new RenderSuiteTableDataConfig;
    }
    public function render()
    {
        $this->config();
        return $this->renderConfig->render();
    }
    private function config()
    {
        $renderConfig = $this->renderConfig;
        $renderConfig
            ->title(['Stock', 'المخزن'])
            ->slug('stock')
            ->data(TableFormater::pagination(Stock::withSum('stockItems','quantity')))
            ->columns([
                $renderConfig->column('name', ['Name', 'اسم المخزن'], true),
                $renderConfig->column('stock_items_sum_quantity', ['Stock Items Count', 'عدد الاصناف'], true),
            ])
            ->actions([
                'edit' => true,
                'delete' => true,
            ])
            ->searchable([
                $renderConfig->searchAttr('name', ['Name', 'اسم المخزن']),
            ])
            ->routes([
                'store' => 'stocks.store',
                'update' => 'stocks.update',
                'delete' => 'stocks.destroy',
            ])
            ->form([
                $renderConfig->col(),
                $renderConfig->text('name', ['Stock Name', 'اسم المخزن']),
            ]);
    }
}
