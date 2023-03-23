import {  Inertia } from "@inertiajs/inertia";
export default class StockServices {
    static BASE_ROUTE = "/stocks";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`);
    }
}
