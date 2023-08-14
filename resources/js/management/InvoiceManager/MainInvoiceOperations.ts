import {
    InvoiceOperationPropsStates,
    InvoiceOperations,
} from "./CreateInvoiceManager";

export default abstract class MainInvoiceOperations<
    InvoiceItem extends { id: number; key: string }
> implements InvoiceOperations<InvoiceItem>
{
    abstract validation(invoiceItem: InvoiceItem): boolean;

    abstract increaseItem(
        invoiceItem: InvoiceItem,
        quantity: number
    ): InvoiceItem;

    abstract correctTotal(invoiceItem: InvoiceItem): InvoiceItem;

    private addToExistingItem(invoiceItem: InvoiceItem) {
        const invoiceItems = this.props.invoiceItems.map((item) => {
            const itemMatch = item.id === invoiceItem.id;
            if (itemMatch) return this.increaseItem(item, 1);
            return item;
        });
        this.props.setInvoiceItems(invoiceItems);
        return;
    }

    private searchFocus() {
        const timeout = setTimeout(() => {
            this.props.searchInputRef.current?.focus();
            clearTimeout(timeout);
        }, 0);
    }

    constructor(public props: InvoiceOperationPropsStates<InvoiceItem>) {
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.cancelOperation = this.cancelOperation.bind(this);
        this.getInvoiceItems = this.getInvoiceItems.bind(this);
    }

    public getInvoiceItems() {
        return this.props.invoiceItems;
    }

    public add(invoiceItem: InvoiceItem) {
        if (!this.validation(invoiceItem)) return;
        const itemExistInInvoice = this.props.invoiceItems.find(
            (item) => item.id == invoiceItem.id
        );
        if (itemExistInInvoice) return this.addToExistingItem(invoiceItem);
        this.props.setInvoiceItems([invoiceItem, ...this.props.invoiceItems]);
    }

    public edit(invoiceItem: InvoiceItem) {
        if (!this.validation(invoiceItem)) return;
        const invoiceItems = this.props.invoiceItems.map((item) => {
            const itemMatch = item.id === invoiceItem.id;
            if (itemMatch) return this.correctTotal(invoiceItem);
            return item;
        });
        this.props.setInvoiceItems(invoiceItems);
        this.searchFocus();
    }

    public remove(invoiceItem: InvoiceItem) {
        console.log(invoiceItem);
        
        this.props.setInvoiceItems(
            this.props.invoiceItems.filter(
                (item) => item.key !== invoiceItem.key
            )
        );
    }

    public cancelOperation() {
        this.props.setInvoiceItems([]);
    }
}
