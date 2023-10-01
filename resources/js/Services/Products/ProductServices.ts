import { router } from '@inertiajs/react';
import { message } from "antd";
export default class ProductServices {
    static BASE_ROUTE = "/products";
    // routing
    static index() {
        router.get(`${this.BASE_ROUTE}`);
    }

    static removeProductFromGroup(id: number) {
        router.get(
            ProductServices.BASE_ROUTE + `/remove-product-from-group/${id}`,
            undefined,
            {
                preserveState: true,
            }
        );
    }
}
