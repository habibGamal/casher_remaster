import { SorterResult } from "antd/es/table/interface";

export default function sortInfoMapping<T>(sortInfo: SorterResult<T>) {
    let order: string | null | undefined = sortInfo.order;
    if (order === 'ascend') order = 'asc';
    if (order === 'descend') order = 'desc';
    return { order: order ?? null, columnKey: sortInfo.columnKey ?? null };
}
