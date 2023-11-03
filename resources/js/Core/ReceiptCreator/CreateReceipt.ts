import axios from "axios";

interface CreateReceiptProps {
    config: ReceiptConfig;
    receiptItems: ReceiptItem[];
    setReceiptItems: (receiptItems: ReceiptItem[]) => void;
    sourceDist: {
        sourceId: string | null;
        distId: string | null;
    };
    searchData: {
        attribute: string;
        value: string;
    };
    searchFocus: () => void;
    controlLoading: {
        start: () => void;
        stop: () => void;
    };
    reset: () => void;
}

/**
 * create the correct receipt based on the config
 */
export class CreateReceiptFactory {
    public static createReceipt(props: CreateReceiptProps): CreateReceipt {
        switch (props.config.info.type) {
            case "purchase":
                return new CreateReceipt(
                    props as CreateReceiptProps,
                    new SearchPurchaseInvoice()
                );
            case "sales":
                return new CreateReceipt(/** ... */);
            default:
                throw new Error("Receipt type not found");
        }
    }
}

interface CreateReceiptSearch {
    search(): Promise<ReceiptItem>;
}

interface CreateReceiptValidation {
    validation(receiptItem: ReceiptItem): boolean;
}

interface CreateReceiptUpdateTotal {
    updateTotal(receiptItem: ReceiptItem): ReceiptItem;
}

class CreateReceipt {
    constructor(
        public props: CreateReceiptProps,
        public searchStrategy: CreateReceiptSearch,
        public validationStrategy: CreateReceiptValidation,
        public updateTotalStrategy: CreateReceiptUpdateTotal
    ) {}

    search(): Promise<ReceiptItem> {
        return this.searchStrategy.search();
    }

    async onSearch() {
        const receiptItem = await this.searchStrategy.search();
        this.add(receiptItem);
    }

    validation(receiptItem: ReceiptItem): boolean {
        return this.validationStrategy.validation(receiptItem);
    }

    updateTotal(receiptItem: ReceiptItem): ReceiptItem {
        return this.updateTotalStrategy.updateTotal(receiptItem);
    }

    tryIncreaseItem(receiptItem: ReceiptItem, quantity: number) {
        const increasedItem =this.increaseItemStrategy.increaseItem(receiptItem, quantity);
        if (this.validation(increasedItem)) return increasedItem;
    }

    addToExistingItem(receiptItem: ReceiptItem) {
        const receiptItems = this.props.receiptItems.map((item) => {
            const itemMatch = item.id === receiptItem.id;
            if (itemMatch) return this.tryIncreaseItem(item, 1);
            return item;
        });
        this.props.setReceiptItems(receiptItems);
        return;
    }

    add(receiptItem: ReceiptItem) {
        const itemExistInReceipt = this.props.receiptItems.find(
            (item) => item.id == receiptItem.id
        );
        if (itemExistInReceipt) return this.addToExistingItem(receiptItem);
        this.props.setReceiptItems([receiptItem, ...this.props.receiptItems]);
    }

    edit(receiptItem: ReceiptItem) {
        if (!this.validation(receiptItem)) return;
        const invoiceItems = this.props.receiptItems.map((item) => {
            const itemMatch = item.id === receiptItem.id;
            if (itemMatch) return this.updateTotal(receiptItem);
            return item;
        });
        this.props.setReceiptItems(invoiceItems);
        this.props.searchFocus();
    }

    remove(receiptItem: ReceiptItem) {
        this.props.setReceiptItems(
            this.props.receiptItems.filter((item) => item.id !== receiptItem.id)
        );
    }

    cancelOperation() {
        this.props.reset();
    }
}

class SearchPurchaseInvoice implements CreateReceiptSearch {
    public async search() {
        axios.get("/api/purchase-invoices");
    }
}
