import { router } from '@inertiajs/react'
export default class StockServices {
    static BASE_ROUTE = "/stocks";
    // routing
    static index() {
        router.get(`${this.BASE_ROUTE}`);
    }
}
