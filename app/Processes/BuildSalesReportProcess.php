<?php

namespace App\Processes;

use App\Models\SellingInvoice;

class BuildSalesReportProcess
{
    private $start_period;
    private $end_period;
    private $data;
    function __construct($period)
    {
        [$this->start_period, $this->end_period] = explode(' - ', $period);
    }

    private function loadingData()
    {
        $this->data = SellingInvoice::whereDate('created_at', '>=', $this->start_period)
            ->whereDate('created_at', '<=', $this->end_period)
            ->with(['sellingInvoiceItems.stockItem.box.product:id,name', 'returnSellingInvoices.items.product:id,name'])->get();
    }


    /**
     * Get a collection of dates between two dates
     * @return \Illuminate\Support\Collection<TKey, TValue>
     */
    private function getTimeAxes()
    {
        $days = [];
        $start = strtotime($this->start_period);
        $end = strtotime($this->end_period);
        while ($start <= $end) {
            $days[] = date('Y-m-d', $start);
            $start = strtotime("+1 day", $start);
        }
        return collect($days);
    }
    private function filterDate($item, $date)
    {
        return $item->created_at->format('Y-m-d') === $date;
    }
    private function formatingData()
    {
        $time_axes = $this->getTimeAxes();

        $selling_data = $time_axes->map(function ($date) {
            $selling_invoices = $this->data->filter(fn ($item) => $this->filterDate($item, $date));
            return  [
                'cash' => $selling_invoices->sum('total_cash'),
                'quantity' => $selling_invoices->pluck('sellingInvoiceItems')->flatten()->sum('quantity'),
                'time' => $date,
            ];
        });
        $return_selling_data = $time_axes->map(function ($date) {
            $return_selling_invoices = $this->data->pluck('returnSellingInvoices')->flatten()->filter(fn ($item) => $this->filterDate($item, $date));
            return [
                'cash' => $return_selling_invoices->sum('total_cost'),
                'quantity' => $return_selling_invoices->pluck('items')->flatten()->sum('quantity'),
                'time' => $date,
            ];
        });
        $net_selling_data = $selling_data->map(function ($item, $key) use ($return_selling_data) {
            return [
                'cash' => $item['cash'] - $return_selling_data[$key]['cash'],
                'quantity' => $item['quantity'] - $return_selling_data[$key]['quantity'],
                'time' => $item['time'],
            ];
        });
        $products_selling_data = $this->data->pluck('sellingInvoiceItems')->flatten()->groupBy('stockItem.box.product.id')->map(function ($item, $key) {
            return [
                'cash' => $item->sum(fn ($item) => $item->selling_price * $item->quantity),
                'quantity' => $item->sum('quantity'),
                'product_id' => $key,
                'product_name' => $item->first()->stockItem->box->product->name,
            ];
        });
        $products_return_selling_data = $this->data->pluck('returnSellingInvoices')->flatten()->pluck('items')->flatten()->groupBy('product.id')->map(function ($item, $key) {
            return [
                'cash' => $item->sum(fn ($item) => $item->return_price * $item->quantity),
                'quantity' => $item->sum('quantity'),
                'product_id' => $key,
                'product_name' => $item->first()->product->name,
            ];
        });
        $products_net_selling_data = $products_selling_data->map(function ($item, $key) use ($products_return_selling_data) {
            return [
                'cash' => $item['cash'] - $products_return_selling_data[$key]['cash'],
                'quantity' => $item['quantity'] - $products_return_selling_data[$key]['quantity'],
                'product_id' => $item['product_id'],
                'product_name' => $item['product_name'],
            ];
        });
        $total_quantity_of_selling_products = $products_selling_data->sum('quantity');
        $total_cash_of_selling_products = $products_selling_data->sum('cash');
        $total_quantity_of_return_selling_products = $products_return_selling_data->sum('quantity');
        $total_cash_of_return_selling_products = $products_return_selling_data->sum('cash');
        $total_quantity_of_net_selling_products = $products_net_selling_data->sum('quantity');
        $total_cash_of_net_selling_products = $products_net_selling_data->sum('cash');
        $total_number_of_selling_invoices = $this->data->count();
        $total_number_of_return_selling_invoices = $this->data->pluck('returnSellingInvoices')->flatten()->count();
        $this->data = [
            'selling_data' => $selling_data,
            'return_selling_data' => $return_selling_data,
            'net_selling_data' => $net_selling_data,
            'products_selling_data' => $products_selling_data,
            'products_return_selling_data' => $products_return_selling_data,
            'products_net_selling_data' => $products_net_selling_data,
            'total_quantity_of_selling_products' => $total_quantity_of_selling_products,
            'total_cash_of_selling_products' => $total_cash_of_selling_products,
            'total_quantity_of_return_selling_products' => $total_quantity_of_return_selling_products,
            'total_cash_of_return_selling_products' => $total_cash_of_return_selling_products,
            'total_quantity_of_net_selling_products' => $total_quantity_of_net_selling_products,
            'total_cash_of_net_selling_products' => $total_cash_of_net_selling_products,
            'total_number_of_selling_invoices' => $total_number_of_selling_invoices,
            'total_number_of_return_selling_invoices' => $total_number_of_return_selling_invoices,
        ];
    }

    public function process()
    {
        $this->loadingData();
        $this->formatingData();
        return $this->data;
    }
}
