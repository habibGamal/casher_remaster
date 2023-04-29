<?php

namespace App\Services;

use Illuminate\Http\Request;


/**
 * it is a utillity class that helps
 * to extract and organize the parameters from `Request $request`
 * that comes with the get request
 * like the pagination settings and search parameters
 * and ordering results
 * note : `slug` is the piece of data that we interest in
 */
class TableSettingsServices
{
    public $order;
    public $columnKey;
    public $pageSize;
    public $attribute;
    public $search;
    private $request;
    private $slug;

    function __construct(Request $request, string $slug, string $defaultOrderColumn = '')
    {
        // privately set request and slug for more usage in other methods in this class
        $this->request = $request;
        $this->slug = $slug;
        // order holds 'desc' or 'asc'
        $this->order = $request->query($slug . '_order') ?? 'desc';
        // it is the attribute that we want to order results by it
        $this->columnKey = $request->query($slug . '_order') ? $request->query($slug . '_columnKey') : $defaultOrderColumn;
        // size of results that returned
        $this->pageSize = $request->query($slug . '_pageSize') ?? 10;
        // attribute name that we want to search in
        $this->attribute = $request->query($slug . '_attribute');
        // the value that we search for
        $this->search = $request->query($slug . '_search');
    }

    /**
     * returning that if we in search state or not
     */
    public function isSearch()
    {
        return $this->request->query($this->slug . '_search');
    }
}
