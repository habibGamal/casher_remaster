import {  Inertia } from "@inertiajs/inertia";
export default class OpeningStockServices {
    static BASE_ROUTE = "/opening-stocks";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`);
    }
}
