import { message } from "antd";
import { ReturnInvoiceOperations } from "./CreateInvoiceManager";

export default class NoReturnOperations
    implements ReturnInvoiceOperations<any>
{
    constructor(public props: any) {
        this.edit = this.edit.bind(this);
        this.cancelOperation = this.cancelOperation.bind(this);
        this.getInvoiceItems = this.getInvoiceItems.bind(this);
    }

    public getInvoiceItems() {
        throw new Error("This type of Invoice does not support this operation");
        return [];
    }

    public edit() {
        throw new Error("This type of Invoice does not support this operation");
    }

    public cancelOperation() {
        throw new Error("This type of Invoice does not support this operation");
    }
}
