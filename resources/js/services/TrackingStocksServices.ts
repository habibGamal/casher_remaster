import {  Inertia } from "@inertiajs/inertia";
export default class TrackingStockServices {
    static BASE_ROUTE = "/tracking-stocks";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`);
    }
}
