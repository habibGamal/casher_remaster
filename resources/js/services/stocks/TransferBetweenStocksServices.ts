import {  Inertia } from "@inertiajs/inertia";
export default class TransferBetweenStocksServices {
    static BASE_ROUTE = "/transfer-between-stocks";
    // routing
    static index() {
        Inertia.get(`${this.BASE_ROUTE}`);
    }
}
