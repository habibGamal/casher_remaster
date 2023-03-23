import StateLoading from "../types/StateLoading";

export default interface TableGlobalSettings {
    page?: number;
    pageSize?: number;
    sortInfo?: {
        order: string | null;
        columnKey: React.Key | null;
    };
    stateLoading?: StateLoading;
    search?: string;
    attribute?: string;
    [key: string]: any;
}
