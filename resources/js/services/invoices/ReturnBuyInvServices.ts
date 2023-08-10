import { Inertia } from "@inertiajs/inertia";

export default class ReturnBuyInvServices {
    static BASE_ROUTE = "/return-buying-invoice";
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
