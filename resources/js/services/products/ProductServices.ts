import { Inertia } from "@inertiajs/inertia";
import { message } from "antd";
export default class ProductServices {
    static BASE_ROUTE = "/products";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`);
    }

    static removeProductFromGroup(id: number) {
        Inertia.get(
            ProductServices.BASE_ROUTE + `/remove-product-from-group/${id}`,
            undefined,
            {
                preserveState: true,
            }
        );
    }
}
