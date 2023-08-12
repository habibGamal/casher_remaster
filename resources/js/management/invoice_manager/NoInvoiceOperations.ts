import { InvoiceOperations } from "./CreateInvoiceManager";

export default class NoInvoiceOperations implements InvoiceOperations<null> {
    constructor(public props: any) {}

    public getInvoiceItems() {
        throw new Error("This type of Invoice does not support this operation");
        return [];
    }

    public add() {
        throw new Error("This type of Invoice does not support this operation");
    }

    public edit() {
        throw new Error("This type of Invoice does not support this operation");
    }

    public remove() {
        throw new Error("This type of Invoice does not support this operation");
    }

    public cancelOperation() {
        throw new Error("This type of Invoice does not support this operation");
    }
}
