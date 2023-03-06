import Product from "./Product";

export default interface ProductGroup {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface ProductGroupWithProductsCount extends ProductGroup {
    products_count: number;
}

export interface ProductGroupWithProducts extends Partial<ProductGroup> {
    products: Partial<Product>[];
}
