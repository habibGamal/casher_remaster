import React, { useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useModal from "../../../hooks/useModal";
import useSortTable from "../../../hooks/useSortTable";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import Product, { ProductWithProductGroup } from "../../../interfaces/Product";
import Pagination from "../../../interfaces/Pagination";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import sortInfoMapping from "../../../helpers/sortInfoMapping";
import { usePage } from "@inertiajs/inertia-react";
import useLoading from "../../../hooks/useLoading";
import ModelServices from "../../../services/ModelServices";
import OpeningStockServices from "../../../services/OpeningStockServices";
import { OpeningStockEntry } from "../../../interfaces/OpeningStockItem";

type Model = OpeningStockEntry;
interface TableProps {
    searchMode: boolean;
    search: string;
    attribute: string;
}

const OpeningStocksTable = ({ searchMode, search, attribute }: TableProps) => {
    const tableState = useLoading();
    const openingStockItems = usePage().props.openingStockItems as Pagination<Model>;
    console.log(openingStockItems.data);

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
            title: "أسم الصنف",
            dataIndex: ["stock_item","product","name"],
            key: "name",
            ...getSortProps("name"),
        },
        {
            title: "كود الصنف",
            dataIndex: ["stock_item","product","barcode"],
            key: "barcode",
        },
        {
            title: "المخزن",
            dataIndex: ["stock_item","stock","name"],
            key: "stock_name",
        },
        {
            title: "الكمية",
            dataIndex: ["stock_item","quantity"],
            key: "buying_price",
            ...getSortProps("buying_price"),
        },
        {
            title: "تاريخ الصلاحية",
            dataIndex: ["stock_item","expiration_date"],
            key: "minimum_stock",
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
                            ModelServices.delete(
                                record.id!,
                                OpeningStockServices.BASE_ROUTE
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
            const service = ModelServices.setTableGlobalSettings({
                stateLoading: tableState.stateLoading,
                search,
                attribute,
            });
            service.updateTableData("openingStockItems");
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
        const service = ModelServices.setTableGlobalSettings({
            page: pagination.current!,
            pageSize: pagination.pageSize!,
            sortInfo,
            stateLoading: tableState.stateLoading,
            search,
            attribute,
        });
        service.updateTableData("openingStockItems");
    };

    return (
        <>
            <Modal
                title="تعديل صنف"
                open={open}
                onOk={handleOk}
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
                width="90%"
            >
                {/* <OpeningStockForm
                    closeModal={closeModal}
                    modelToEdit={modelToEdit || undefined}
                /> */}
            </Modal>
            <Table
                columns={columns}
                rowKey={(record) => record.id!}
                dataSource={openingStockItems.data}
                pagination={{
                    ...tableParams.pagination,
                    total: openingStockItems.total,
                }}
                loading={tableState.loading}
                bordered
                onChange={handleTableChange}
                scroll={{ x: true }}
                footer={() => "عدد النتائج : " + openingStockItems.total}
            />
        </>
    );
};

export default OpeningStocksTable;
