import { Inertia } from "@inertiajs/inertia";
import { message } from "antd";

export default class ProductGroupServices {
    static BASE_ROUTE = "/product-groups";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`);
    }

    // to display the product that is in the group
    static getProductsInGroup(id: number) {
        Inertia.get(
            this.BASE_ROUTE + "/display-products-in-group",
            {
                productGroupId: id,
                // reset search to get all products if we close the modal and open it again
                productsInGroup_search: "",
            },
            {
                only: ["productsInGroup"],
                preserveState: true,
            }
        );
    }
}
