<?php

namespace App\Utilities;

use Illuminate\Http\Request;

class TableFormater{
    public $order;
    public $columnKey;
    public $pageSize;
    public $attribute;
    public $search;
    private $request;
    public $slug;

    function __construct(string $defaultOrderColumn = '')
    {
        // privately set request and slug for more usage in other methods in this class
        $this->request = $request = request();
        $this->slug = $request->query('slug');
        // order holds 'desc' or 'asc'
        $this->order = $request->query($this->slug . '_order') ?? 'desc';
        // it is the attribute that we want to order results by it
        $this->columnKey = $request->query($this->slug . '_order') ? $request->query($this->slug . '_columnKey') : $defaultOrderColumn;
        // size of results that returned
        $this->pageSize = $request->query($this->slug . '_pageSize') ?? 10;
        // attribute name that we want to search in
        $this->attribute = $request->query($this->slug . '_attribute');
        // the value that we search for
        $this->search = $request->query($this->slug . '_search');
    }

    /**
     * returning that if we in search state or not
     */
    public function isSearch()
    {
        return $this->request->query($this->slug . '_search');
    }

    static function pagination($elquentBuilder, $defaultOrderColumn = "created_at")
    {
        $settings = new TableFormater($defaultOrderColumn);
        if ($settings->isSearch()) {
            $elquentBuilder->where($settings->attribute, 'like', '%' . $settings->search . '%');
        }
        $elquentBuilder->orderBy($settings->columnKey, $settings->order);
        $data = $elquentBuilder->paginate($settings->pageSize, ['*'], $settings->slug . '_page');

        return $data;
    }
}
