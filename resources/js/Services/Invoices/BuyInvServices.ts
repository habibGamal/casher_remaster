import { router } from '@inertiajs/react';

export default class BuyInvServices {
    static BASE_ROUTE = "/buying-invoice";
    // routing
    static index() {
        router.get(`${this.BASE_ROUTE}`, undefined, { preserveState: true });
    }

    static create() {
        router.get(`${this.BASE_ROUTE}/create`);
    }

    static storeURL() {
        return `${this.BASE_ROUTE}/store`;
    }

    static show(id: number) {
        router.get(`${this.BASE_ROUTE}/${id}`);
    }
}
