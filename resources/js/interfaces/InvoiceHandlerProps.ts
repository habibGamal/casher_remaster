import { InputRef } from "antd";

export default interface InvoiceHandlerProps<InvoiceItem> {
    invoiceData:any;
    setInvoiceData: React.Dispatch<React.SetStateAction<any>>;
    invoiceItems: InvoiceItem[];
    setInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
    search: {
        data: {
            attribute: string;
            value: string;
        };
        changeSearchAttribute: (value: string) => void;
        changeSearchValue: (value: string) => void;
    };
    searchInputRef: React.RefObject<InputRef>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    extraData?: any;
}
