<?php

namespace App\Render;

use App\Enums\SearchSelectSlug;
use App\Models\Product;
use App\Models\ProductGroup;
use App\Utilities\RenderSuiteTableDataConfig;
use App\Utilities\TableFormater;

class ProductGroupRender
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
            ->title(['Product Groups', 'مجموعات المنتجات'])
            ->slug('product_groups')
            ->data(TableFormater::pagination(ProductGroup::withCount('products')))
            ->columns([
                $renderConfig->column('name', ['Name', 'اسم المجموعة'], true),
                $renderConfig->column('products_count', ['Products Count', 'عدد المنتجات'], true),
            ])
            ->actions([
                'edit' => true,
                'delete' => true,
            ])
            ->searchable([
                $renderConfig->searchAttr('name', ['Name', 'اسم المجموعة']),
            ])
            ->routes([
                'store' => 'product-groups.store',
                'update' => 'product-groups.update',
                'delete' => 'product-groups.destroy',
            ])
            ->form([
                $renderConfig->col(),
                $renderConfig->text('name', ['Product Group Name', 'اسم مجموعة المنتجات']),
            ]);
    }
}
