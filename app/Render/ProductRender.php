<?php

namespace App\Render;

use App\Enums\SearchSelectSlug;
use App\Models\Product;
use App\Utilities\RenderSuiteTableDataConfig;
use App\Utilities\TableFormater;

class ProductRender
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
            ->title(['Products', 'الاصناف'])
            ->slug('products')
            ->data(TableFormater::pagination(Product::with('productGroup:id,name')))
            ->columns([
                $renderConfig->column('name', ['Name', 'اسم المنتج'], true),
                $renderConfig->column('barcode', ['Barcode', 'باركود'], true),
                $renderConfig->column('selling_price', ['Selling Price', 'سعر البيع'], true),
                $renderConfig->column('last_buying_price', ['Last Buying Price', 'اخر سعر شراء'], true),
                $renderConfig->column('unit', ['Unit', 'الوحدة'], true),
                $renderConfig->column('product_group.name', ['Product Group', 'مجموعة المنتج']),
            ])
            ->expandable([
                $renderConfig->expand('has_expire_date', ['Has Expire Date', 'له تاريخ انتهاء']),
                $renderConfig->expand('minimum_stock', ['Minimum Stock', 'الحد الادني للمخزون']),
            ])
            ->actions([
                'edit' => true,
                'delete' => true,
            ])
            ->searchable([
                $renderConfig->searchAttr('name', ['Name', 'اسم المنتج']),
                $renderConfig->searchAttr('barcode', ['Barcode', 'باركود']),
                $renderConfig->searchAttr('selling_price', ['Selling Price', 'سعر البيع']),
                $renderConfig->searchAttr('last_buying_price', ['Last Buying Price', 'اخر سعر شراء']),
                $renderConfig->searchAttr('unit', ['Unit', 'الوحدة']),
                $renderConfig->searchAttr('product_group.name', ['Product Group', 'مجموعة المنتج']),
            ])
            ->routes([
                'store' => 'products.store',
                'update' => 'products.update',
                'delete' => 'products.destroy',
            ])
            ->form([
                $renderConfig->col(),
                $renderConfig->text('name', ['Product Name', 'اسم المنتج']),
                $renderConfig->text('barcode', ['Barcode', 'باركود']),
                $renderConfig->select_search('product_group_id', ['Product Group', 'مجموعة المنتج'], SearchSelectSlug::product_group),
                $renderConfig->col(),
                $renderConfig->number('selling_price', ['Selling Price', 'سعر البيع'], 0),
                $renderConfig->number('last_buying_price', ['Last Buying Price', 'اخر سعر شراء'], 0),
                $renderConfig->number('minimum_stock', ['Minimum Stock', 'الحد الادني للمخزون'], 0),
                $renderConfig->col(),
                $renderConfig->radio('unit_or_weight', ['Unit Or Weight', 'الوحدة او الوزن'], [
                    '1' => ['Unit', 'وحدة'],
                    '0' => ['Weight', 'وزن'],
                ]),
                $renderConfig->select('unit', ['Unit', 'الوحدة'], [
                    'piece' => ['Piece', 'قطعة'],
                    'box' => ['Box', 'صندوق'],
                    'carton' => ['Carton', 'كرتونة'],
                ], [
                    'unit_or_weight' => '0'
                ]),
                $renderConfig->checkbox('has_expire_date', ['Has Expire Date', 'له تاريخ انتهاء']),
            ]);
    }
}
