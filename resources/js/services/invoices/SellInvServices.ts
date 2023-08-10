import { Inertia } from "@inertiajs/inertia";


export default class SellInvServices {
    static BASE_ROUTE = "/selling-invoice";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`, undefined, { preserveState: true });
    }

    static create() {
        Inertia.get(`${this.BASE_ROUTE}/create`);
    }

    static storeURL() {
        return `${this.BASE_ROUTE}/store`;
    }

    static show(id: number) {
        Inertia.get(`${this.BASE_ROUTE}/${id}`);
    }

}
