import { useState } from "react";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { TableParams } from "../interfaces/TableParams";

const useTablePagination = <T>(current = 1, pageSize = 10) => {
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current,
            pageSize,
        },
    });

    const resetPagination = () => {
        setTableParams(tableParams => ({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                current: 1,
            },
        }))
    }

    const updateTableParams = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[],) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    return { tableParams, setTableParams, updateTableParams, resetPagination };
}

export default useTablePagination;
