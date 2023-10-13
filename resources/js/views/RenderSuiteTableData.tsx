import { Col, Descriptions, Modal, Row, Space, Table } from "antd/es";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { useState } from "react";
import PageTitle from "../Components/PageTitle";
import { router, usePage } from "@inertiajs/react";
import useLoading from "../Hooks/useLoading";
import useSortTable from "../Hooks/useSortTable";
import useTablePagination from "../Hooks/useTablePagination";
import { FilterValue, SortOrder, SorterResult } from "antd/es/table/interface";
import sortInfoMapping from "../Helpers/sortInfoMapping";
import useTableSearch from "../Hooks/useTableSearch";
import Pagination from "../Interfaces/Pagination";
import TableController from "../Components/TableController";
import IconSax from "../Components/IconSax";
import useModal from "../Hooks/useModal";
import useWhileTyping from "../Hooks/useWhileTyping";
import FormComponentEnhanced from "../Components/FormComponentEnhanced";
import EditButton from "../Components/EditButton";
import DeleteButton from "../Components/DeleteButton";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

type RowData = {
    id: number;
    [key: string]: any;
};

type TableData = {
    key: string;
    sorter?: boolean;
    sortOrder?: SortOrder | undefined;
    onHeaderCell?: () => {
        onClick: () => void;
    };
    sortDirections?: SortOrder[];
} & RowData;

type UpdateTableDataArgs = {
    page?: number;
    pageSize?: number;
    order?: string | null;
    columnKey?: React.Key | null;
    search: string;
    attribute: string;
    tableLoading: ReturnType<typeof useLoading>;
};

type Props = {
    title: [string, string];
    slug: string;
    columns: {
        [key: string]: {
            label: [string, string];
            sortable: boolean;
        };
    };
    expandable: { [key: string]: [string, string] };
    searchable: { [key: string]: [string, string] };
    actions?: {
        edit?: boolean;
        delete?: boolean;
        add?: boolean;
    };
    routes?: {
        delete?: string;
        update?: string;
        store?: string;
    };
};

const addControls = (
    actions: Props["actions"],
    tableColumns: ColumnsType<TableData>,
    setModelToEdit: React.Dispatch<React.SetStateAction<any | undefined>>,
    modalForm: ReturnType<typeof useModal>,
    deleteRoute?: string
) => {
    const controls = {
        title: "تحكم",
        key: "control",
        render: (record: TableData) => (
            <Space size="middle">
                {actions?.edit && (
                    <EditButton
                        onClick={() => {
                            console.log(record);
                            setModelToEdit(record);
                            modalForm.showModal();
                        }}
                    />
                )}
                {actions?.delete && (
                    <DeleteButton
                        onClick={() => {
                            if (!deleteRoute) return;
                            router.delete(route(deleteRoute, record.id));
                        }}
                    />
                )}
            </Space>
        ),
    };
    actions && tableColumns.push(controls);
};

export default function RenderSuiteTableData({
    title,
    slug,
    columns,
    expandable,
    searchable,
    actions,
    routes,
}: Props) {
    const pageProps = usePage().props;

    const paginationData = pageProps[slug] as Pagination<RowData>;

    const tableData = paginationData.data.map((record) => ({
        key: record.id.toString(),
        ...record,
    })) as TableData[];

    // it just to update the UI arrows up and down or none
    // it has nothing to do with updating data just for UI
    const sortingArrows = useSortTable("created_at");

    const tableColumns: ColumnsType<TableData> = Object.entries(columns).map(
        ([key, value]) => {
            const dataIndex: string | string[] = key.includes(".")
                ? key.split(".")
                : key;
            let column = {
                key,
                title: value.label[1],
                dataIndex: dataIndex,
            };
            if (value.sortable)
                column = {
                    ...column,
                    ...sortingArrows.getSortProps(key),
                };

            return column;
        }
    );

    const searchableColumns = Object.entries(searchable).map(
        ([key, value]) => ({ label: value[1], value: key })
    );

    const updateTableData = ({
        page,
        pageSize,
        order,
        columnKey,
        search,
        attribute,
        tableLoading,
    }: UpdateTableDataArgs) =>
        router.reload({
            only: [slug],
            data: {
                [`${slug}_page`]: page,
                [`${slug}_pageSize`]: pageSize,
                [`${slug}_order`]: order,
                [`${slug}_columnKey`]: columnKey,
                [`${slug}_search`]: search,
                [`${slug}_attribute`]: attribute,
                slug: slug,
            },
            preserveState: true,
            onStart: () => tableLoading.stateLoading.onStart(),
            onFinish: () => tableLoading.stateLoading.onFinish(),
        });

    // const search = useTableSearch(config.search.defaultValue);
    const search = useTableSearch(searchableColumns[0].value);

    // control loading sign of the table
    const tableLoading = useLoading();

    const [modelToEdit, setModelToEdit] = useState<any | undefined>(undefined);

    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get(slug + "_page") ?? "1";
    const pageSize = params.get(slug + "_pageSize") ?? "10";
    const { tableParams, updateTableParams, resetPagination } =
        useTablePagination<any>(parseInt(currentPage), parseInt(pageSize));

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<any> | SorterResult<any>[]
    ) => {
        updateTableParams(pagination, filters, sorter);
        const sortInfo = sortInfoMapping(sorter as SorterResult<any>);
        updateTableData({
            page: pagination.current!,
            pageSize: pagination.pageSize!,
            order: sortInfo.order,
            columnKey: sortInfo.columnKey,
            search: search.search,
            attribute: search.attribute,
            tableLoading,
        });
    };

    const modalForm = useModal();

    const expandedRowRender = (record: TableData) => {
        const descriptions = Object.entries(expandable).map(([key, value]) => (
            <Descriptions.Item label={value[1]}>
                {record[key]}
            </Descriptions.Item>
        ));
        return (
            <Descriptions
                title="المزيد من التفاصيل"
                bordered
                column={{
                    xxl: 4,
                    xl: 3,
                    lg: 3,
                    md: 3,
                    sm: 2,
                    xs: 1,
                }}
            >
                {descriptions}
            </Descriptions>
        );
    };

    useWhileTyping(
        () => {
            // reset pagination and sort states
            resetPagination!();
            sortingArrows!.resetSortState();
            updateTableData({
                search: search.search,
                attribute: search.attribute,
                tableLoading,
            });
        },
        // the hook function ^ work only when search mode is true
        search.searchMode,
        // either search mode or search value changed the function run
        [search.searchMode, search.search, search.attribute]
    );

    addControls(
        actions,
        tableColumns,
        setModelToEdit,
        modalForm,
        routes?.delete
    );

    const submitRoute = (): string | undefined => {
        return modelToEdit ? routes?.update : routes?.store;
    };

    const addButtonAction = () => {
        setModelToEdit(undefined);
        modalForm.showModal();
    };

    console.log(pageProps)

    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={title[1]} />
            <Modal
                title={title[0]}
                {...modalForm}
                footer={null}
                destroyOnClose={true}
                width="90%"
                closeIcon={<IconSax icon="add" className="rotate-45" />}
            >
                <FormComponentEnhanced
                    submitRoute={submitRoute() ?? ""}
                    formName="products_form"
                    initValues={modelToEdit}
                    closeModal={modalForm.closeModal}
                />
            </Modal>
            <Col span="24" className="isolate">
                <TableController
                    addButtonText="اضافة صنف"
                    addButtonAction={addButtonAction}
                    searchButtonAction={() => search.enterSearchMode()}
                    setSearch={search.setSearch}
                    setAttribute={search.setAttribute}
                    exitSearchMode={() => {
                        // ctx.config.exitSearchMode(ctx);
                    }}
                    options={searchableColumns}
                />
                <Table
                    columns={tableColumns}
                    dataSource={tableData}
                    pagination={{
                        ...tableParams.pagination,
                        total: paginationData.total,
                    }}
                    expandable={{
                        expandedRowRender: expandable
                            ? expandedRowRender
                            : undefined,
                        rowExpandable: (record) =>
                            record.name !== "Not Expandable",
                    }}
                    loading={tableLoading.loading}
                    bordered
                    onChange={handleTableChange}
                    scroll={{ x: true }}
                    footer={() => "عدد النتائج : " + paginationData.total}
                />
                {/* <model.ModelTable /> */}
            </Col>
        </Row>
    );
}
