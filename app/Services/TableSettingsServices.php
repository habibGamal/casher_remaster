<?php

namespace App\Services;

use Illuminate\Http\Request;

class TableSettingsServices {
    public $order;
    public $columnKey;
    public $pageSize;
    public $attribute;
    public $search ;

    function __construct(Request $request,string $slug,string $defaultOrderColumn = '')
    {
        $this->order = $request->query($slug.'_order') ?? 'desc';
        $this->columnKey = $request->query($slug.'_order') ? $request->query($slug.'_columnKey') : $defaultOrderColumn;
        $this->pageSize = $request->query($slug . '_pageSize') ?? 10;
        $this->attribute = $request->query($slug.'_attribute');
        $this->search = $request->query($slug.'_search');
    }
}
