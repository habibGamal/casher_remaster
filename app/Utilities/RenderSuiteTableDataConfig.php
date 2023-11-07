<?php

namespace App\Utilities;

class RenderSuiteTableDataConfig
{
    static $colNumber = 0;
    public $title;
    public $slug;
    public $data;
    public $columns;
    public $expandable;
    public $actions;
    public $searchable;
    public $routes;
    public $form;
    public $request;

    function __construct()
    {
        $this->request = request();
    }

    public function title($title)
    {
        $this->title = $title;
        return $this;
    }

    public function slug($slug)
    {
        $this->slug = $slug;
        return $this;
    }

    public function data($data)
    {
        $this->data = $data;
        return $this;
    }

    public function columns($columns)
    {
        $this->columns = $this->transformArray($columns);
        return $this;
    }

    public function expandable($expandable)
    {
        $this->expandable = $this->transformArray($expandable);
        return $this;
    }

    public function actions($actions)
    {
        $this->actions = $actions;
        return $this;
    }

    public function searchable($searchable)
    {
        $this->searchable = $this->transformArray($searchable);
        return $this;
    }

    public function routes($routes)
    {
        $this->routes = $routes;
        return $this;
    }

    public function form($form)
    {
        $this->form = $this->transformArray($form);
        return $this;
    }

    public function column($key, $label, $sortable = false)
    {
        return [
            $key => [
                'label' => $label,
                'sortable' => $sortable,
            ],
        ];
    }

    public function expand($key, $label)
    {
        return [
            $key => $label,
        ];
    }

    public function searchAttr($key, $label)
    {
        return [
            $key => $label,
        ];
    }

    public function col()
    {
        self::$colNumber++;
        return [
            'col' . self::$colNumber => true,
        ];
    }

    public function text($key, $label)
    {
        return [
            $key => [
                'type' => 'text',
                'label' => $label,
            ],
        ];
    }

    public function number($key, $label, $min = 0)
    {
        return [
            $key => [
                'type' => 'number',
                'label' => $label,
                'min' => $min,
            ],
        ];
    }

    public function select($key, $label, $options, $conditions = [])
    {
        return [
            $key => [
                'type' => 'select',
                'label' => $label,
                'options' => $options,
                'disabled' => $conditions,
            ],
        ];
    }

    public function select_search($key, $label, $slug, $conditions = [])
    {
        return [
            $key => [
                'type' => 'select_search',
                'label' => $label,
                'slug' => $slug,
                'disabled' => $conditions,
            ],
        ];
    }

    public function radio($key, $label, $options)
    {
        return [
            $key => [
                'type' => 'radio',
                'label' => $label,
                'options' => $options,
            ],
        ];
    }

    public function checkbox($key, $label)
    {
        return [
            $key => [
                'type' => 'checkbox',
                'label' => $label,
            ],
        ];
    }

    private function transformArray($array)
    {
        $result = [];
        foreach ($array as $item) {
            foreach ($item as $key => $value) {
                $result[$key] = $value;
            }
        }
        return $result;
    }

    public function render()
    {
        return [
            'title' => fn () => $this->title,
            'slug' => fn () => $this->slug,
            $this->slug => fn () => $this->data,
            'columns' => fn () => $this->columns,
            'expandable' => fn () => $this->expandable,
            'actions' => fn () => $this->actions,
            'searchable' => fn () => $this->searchable,
            'routes' => fn () => $this->routes,
            'form' => fn () => $this->form,
        ];
    }
}
