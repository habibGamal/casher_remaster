import axios from "axios";
type Product = {
    id: number;
    name: string;
    barcode: string;
    last_buying_price: number;
};

export default class ProductSearch implements CreateReceiptSearch {
    async search(
        endpoint: string,
        searchData: {
            attribute: string;
            value: string;
        }
    ): Promise<ReceiptItem | null> {
        try {
            const product = await axios.post<Product>(route(endpoint), {
                attribute: searchData.attribute,
                value: searchData.value,
            });
            return this.factory(product.data);
        } catch (error) {
            return null;
        }
    }

    factory(product: Product): PurchaseInvoiceItem {
        return {
            id: product.id,
            key: product.id,
            barcode: product.barcode,
            name: product.name,
            quantity: 1,
            cost: product.last_buying_price,
            tax: 0.14,
            total: product.last_buying_price,
            expiry_date: "12/2024",
        };
    }
}
