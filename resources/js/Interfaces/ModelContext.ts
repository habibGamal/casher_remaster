import {
    FilterValue,
    SortOrder,
    SorterResult,
    TablePaginationConfig,
} from "antd/es/table/interface";
import Pagination from "./Pagination";
import { TableParams } from "./TableParams";
import ConfigType from "./ModelConfig";

type UseSearchReturn = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    attribute: string;
    setAttribute: React.Dispatch<React.SetStateAction<string>>;
    exitSearchMode: () => void;
    enterSearchMode: () => void;
    searchMode: boolean;
};
type UseModalReturn = {
    open: boolean;
    closeModal: () => void;
    confirmLoading: boolean;
    setConfirmLoading: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
};
type SortingStateType = {
    getSortProps: (columnKey: string) => {
        sorter: boolean;
        sortOrder: SortOrder | undefined;
        onHeaderCell: () => {
            onClick: () => void;
        };
        sortDirections: SortOrder[];
    };
    resetSortState: () => void;
};
export type FreeModelSettings = {
    children: JSX.Element | JSX.Element[] | null;
    onClose?: () => void;
    title:string;
};
export default interface ModelContext<T> {
    paginatedData?: Pagination<T>;
    config: ConfigType;
    modelToEdit?: T;
    setModelToEdit?: React.Dispatch<React.SetStateAction<T | undefined>>;
    search?: UseSearchReturn;
    modalForm?: UseModalReturn;
    freeModal?: UseModalReturn;
    freeModalSettings?: FreeModelSettings;
    setFreeModalSettings?: React.Dispatch<
        React.SetStateAction<FreeModelSettings>
    >;
    onCloseFreeModal?: () => void;
    sortingArrows?: SortingStateType;
    tableParams?: TableParams;
    resetPagination?: () => void;
    handleTableChange?: (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<T> | SorterResult<T>[]
    ) => void;
    tableState?: {
        loading: boolean;
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
        stateLoading: {
            onStart: () => void;
            onFinish: () => void;
        };
    };
}
