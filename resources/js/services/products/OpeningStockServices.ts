import {  Inertia } from "@inertiajs/inertia";
export default class OpeningStockServices {
    static BASE_ROUTE = "/opening-stocks";
    // routing

    static create() {
        Inertia.get(`${this.BASE_ROUTE}/create`);
    }

    static storeURL() {
        return `${this.BASE_ROUTE}/store`;
    }
}
