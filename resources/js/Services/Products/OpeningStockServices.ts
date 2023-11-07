import { router } from '@inertiajs/react'
export default class OpeningStockServices {
    static BASE_ROUTE = "/opening-stocks";
    // routing

    static create() {
        router.get(`${this.BASE_ROUTE}/create`);
    }

    static storeURL() {
        return `${this.BASE_ROUTE}/store`;
    }
}
