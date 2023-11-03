<?php

namespace App\Enums;

enum SearchSelectSlug: string
{
    case product_group = 'product_group';
    case Supplier = 'supplier';
    case Customer = 'customer';
    case Inventory = 'inventory';
}
