import { router } from '@inertiajs/react'
export default class TrackingStockServices {
    static BASE_ROUTE = "/tracking-stocks";
    // routing
    static index() {
        router.get(`${this.BASE_ROUTE}`);
    }
}
