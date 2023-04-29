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

    // fetching custom data with reloads
    static selectSearchProductGroup(
        value: string,
        onSuccess: (page: any) => void
    ) {
        Inertia.reload({
            only: ["productGroups"],
            data: {
                product_group_name: value,
            },
            onSuccess: (page: any) => onSuccess(page),
        });
    }
}
