import React, { useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useModal from "../../../hooks/useModal";
import useSortTable from "../../../hooks/useSortTable";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import { ProductWithProductGroup } from "../../../interfaces/Product";
import Pagination from "../../../interfaces/Pagination";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import sortInfoMapping from "../../../helpers/sortInfoMapping";
import { usePage } from "@inertiajs/inertia-react";
import useLoading from "../../../hooks/useLoading";
import ModelGeneralServices from "../../../services/ModelGeneralServices";
import StockForm from "../forms/StockForm";
import StockServices from "../../../services/stocks/StockServices";
type Model = ProductWithProductGroup;
interface TableProps {
    searchMode: boolean;
    search: string;
    attribute: string;
}

const ProductsTable = ({ searchMode, search, attribute }: TableProps) => {
    const tableState = useLoading();
    const stocks = usePage().props.stocks as Pagination<Model>;

    const { tableParams, updateTableParams, resetPagination } =
        useTablePagination<Model>();

    const [modelToEdit, setModelToEdit] = useState<Model | undefined>(
        undefined
    );

    const {
        open,
        closeModal,
        confirmLoading,
        showModal,
        handleOk,
        handleCancel,
    } = useModal();

    const { getSortProps, resetSortState } = useSortTable<Model>("created_at");

    const editModel = (model: Model) => {
        setModelToEdit(model);
        showModal();
    };

    const columns: ColumnsType<Model> = [
        {
            title: "أسم المخزن",
            dataIndex: "name",
            key: "name",
            ...getSortProps("name"),
        },
        {
            title: "المخزن يحتوي على بضائع",
            dataIndex: "selling_price",
            key: "selling_price",
        },
        {
            title: "تحكم",
            key: "control",
            render: (record: Model) => (
                <Space size="middle">
                    <Button
                        onClick={() => editModel(record)}
                        icon={<EditOutlined className="text-indigo-900" />}
                    />
                    <Button
                        danger
                        type="dashed"
                        onClick={() =>
                            ModelGeneralServices.delete(
                                record.id!,
                                StockServices.BASE_ROUTE
                            )
                        }
                        icon={<DeleteOutlined />}
                    />
                </Space>
            ),
        },
    ];

    useWhileTyping(
        () => {
            resetPagination();
            resetSortState();
            const service = ModelGeneralServices.setTableGlobalSettings({
                stateLoading: tableState.stateLoading,
                search,
                attribute,
            });
            service.updateTableData("stocks");
        },
        searchMode,
        [searchMode, search]
    );

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Model> | SorterResult<Model>[]
    ) => {
        updateTableParams(pagination, filters, sorter);
        const sortInfo = sortInfoMapping<Model>(sorter as SorterResult<Model>);
        const service = ModelGeneralServices.setTableGlobalSettings({
            page: pagination.current!,
            pageSize: pagination.pageSize!,
            sortInfo,
            stateLoading: tableState.stateLoading,
            search,
            attribute,
        });
        service.updateTableData("stocks");
    };

    return (
        <>
            <Modal
                title="تعديل بيانات المخزن"
                open={open}
                onOk={handleOk}
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
                width="90%"
            >
                <StockForm
                    closeModal={closeModal}
                    modelToEdit={modelToEdit || undefined}
                />
            </Modal>
            <Table
                columns={columns}
                rowKey={(record) => record.id!}
                dataSource={stocks.data}
                pagination={{
                    ...tableParams.pagination,
                    total: stocks.total,
                }}
                loading={tableState.loading}
                bordered
                onChange={handleTableChange}
                scroll={{ x: true }}
                footer={() => "عدد النتائج : " + stocks.total}
            />
        </>
    );
};

export default ProductsTable;
