import { InputRef } from "antd";
import React from "react";
export interface BaseInvoiceItem {
    id: number;
    key: string;
    total: number;
}

export interface Factoring<Item, InvoiceItem> {
    factory: (item: Item) => InvoiceItem;
}

export interface Searching<
    SearchParams,
    RawData,
    FactoriedData,
    ExtraData = any
> {
    afterSearch: (factoriedData: FactoriedData, extraData: ExtraData) => void;
    searchParams: SearchParams;
    onSearch: () => void;
    factory: Factoring<RawData, FactoriedData>;
}

export interface Submiting<SubmitedData> {
    remapItemsToSubmit: () => SubmitedData;
    onSubmit: () => void;
}

export interface SearchResultProcessing<Result, DesiredResult> {
    process: (searchResult: Result) => DesiredResult;
}

export interface Add<InvoiceItem> {
    add: (invoiceItem: InvoiceItem) => void;
}

export interface Edit<InvoiceItem> {
    edit: (invoiceItem: InvoiceItem) => void;
}

export interface Remove<InvoiceItem> {
    remove: (invoiceItem: InvoiceItem) => void;
}

export interface CancelOperation {
    cancelOperation: () => void;
}

export interface GetInvoiceItems<InvoiceItem> {
    getInvoiceItems: () => InvoiceItem[];
}

// invoice operations
export interface InvoiceOperationStates<InvoiceItem> {
    props: InvoiceOperationPropsStates<InvoiceItem>;
}
export interface InvoiceOperationPropsStates<InvoiceItem> {
    readonly invoiceItems: InvoiceItem[];
    setInvoiceItems: (invoiceItems: InvoiceItem[]) => void;
    readonly stockId: string | null;
    setStockId: (stockId: string | null) => void;
    readonly loading: boolean;
    setLoading: (loading: boolean) => void;
    search: {
        data: {
            attribute: string;
            value: string;
        };
        changeSearchAttribute: (value: string) => void;
        changeSearchValue: (value: string) => void;
    };
    searchInputRef: React.RefObject<InputRef>;
}
export interface InvoiceOperations<InvoiceItem>
    extends InvoiceOperationStates<InvoiceItem>,
        GetInvoiceItems<InvoiceItem>,
        Add<InvoiceItem>,
        Edit<InvoiceItem>,
        Remove<InvoiceItem>,
        CancelOperation {}
// return invoice operation
export interface ReturnInvoiceOperationStates<InvoiceItem> {
    props: ReturnInvoiceOperationPropsStates<InvoiceItem>;
}
export interface ReturnInvoiceOperationPropsStates<InvoiceItem> {
    readonly additionalData: any;
    setAdditionalData: (additionalData: any) => void;
    readonly invoiceItems: InvoiceItem[];
    setInvoiceItems: (invoiceItems: InvoiceItem[]) => void;
    readonly loading: boolean;
    setLoading: (loading: boolean) => void;
    search: {
        data: {
            attribute: string;
            value: string;
        };
        changeSearchAttribute: (value: string) => void;
        changeSearchValue: (value: string) => void;
    };
}
export interface ReturnInvoiceOperations<InvoiceItem>
    extends ReturnInvoiceOperationStates<InvoiceItem>,
        GetInvoiceItems<InvoiceItem>,
        Edit<InvoiceItem>,
        CancelOperation {}

export default abstract class CreateInvoiceManager<
    SearchParams,
    RawData,
    FactoriedData,
    SubmitedData
> {
    public abstract search: Searching<SearchParams, RawData, FactoriedData>;
    public abstract submit: Submiting<SubmitedData>;
}
