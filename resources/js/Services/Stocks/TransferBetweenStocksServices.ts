import { router } from '@inertiajs/react'
export default class TransferBetweenStocksServices {
    static BASE_ROUTE = "/transfer-between-stocks";
    // routing
    static index() {
        router.get(`${this.BASE_ROUTE}`);
    }
}
