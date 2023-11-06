import axios from "axios";
import ProductSearch from "./Behaviours/CreateReceipt/ProductSearch";
import UpdateTotalCost from "./Behaviours/CreateReceipt/UpdateTotalCost";
import IncreaseQuantityCost from "./Behaviours/CreateReceipt/IncreaseQuantityCost";
import NoValidation from "./Behaviours/CreateReceipt/NoValidation";
import { message } from "antd";

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
    searchClear: () => void;
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
            case "purchase_invoice":
                return new CreateReceipt(
                    props as CreateReceiptProps,
                    new ProductSearch(),
                    new NoValidation(),
                    new UpdateTotalCost(),
                    new IncreaseQuantityCost()
                );
            // case "sales":
            //     return new CreateReceipt(/** ... */);
            default:
                throw new Error("Receipt type not found");
        }
    }
}

class CreateReceipt {
    constructor(
        public props: CreateReceiptProps,
        public searchStrategy: CreateReceiptSearch,
        public validationStrategy: CreateReceiptValidation,
        public updateTotalStrategy: CreateReceiptUpdateTotal,
        public increaseItemStrategy: CreateReceiptIncreaseQuantity
    ) {
        this.onSearch = this.onSearch.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.submit = this.submit.bind(this);
        this.cancelOperation = this.cancelOperation.bind(this);
    }

    async onSearch() {
        const endpoint = this.props.config.info.search_route;
        const sourceId = this.props.sourceDist.sourceId ?? undefined;
        const distId = this.props.sourceDist.distId ?? undefined;
        const { searchData } = this.props;
        const receiptItem = await this.searchStrategy.search(
            endpoint,
            searchData,
            sourceId,
            distId
        );
        if (!receiptItem) return message.error("هذا المنتج غير موجود");
        this.add(receiptItem);
        this.props.searchClear();
    }

    validation(receiptItem: ReceiptItem): boolean {
        return this.validationStrategy.validation(receiptItem);
    }

    updateTotal(receiptItem: ReceiptItem): ReceiptItem {
        return this.updateTotalStrategy.updateTotal(receiptItem);
    }

    tryIncreaseItem(receiptItem: ReceiptItem, quantity: number) {
        const increasedItem = this.increaseItemStrategy.increaseQuantity(
            receiptItem,
            quantity
        );
        if (this.validation(increasedItem)) return increasedItem;
        else return receiptItem;
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

    submit() {
        throw new Error("Not implemented");
    }
}
