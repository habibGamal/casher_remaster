import React, { useState } from "react";
import { Button, Descriptions, Modal, Space, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useModal from "../../../hooks/useModal";
import ProductForm from "../forms/ProductForm";
import useSortTable from "../../../hooks/useSortTable";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import { ProductWithProductGroup } from "../../../interfaces/Product";
import ProductService, {
    ProductTablePaginateSettings,
} from "../../../services/ProductService";
import Pagination from "../../../interfaces/Pagination";
import { Inertia } from "@inertiajs/inertia";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import sortInfoMapping from "../../../helpers/sortInfoMapping";
import { usePage } from "@inertiajs/inertia-react";
import useLoading from "../../../hooks/useLoading";
import ModelServices from "../../../services/ModelServices";
type Model = ProductWithProductGroup;
interface TableProps {
    searchMode: boolean;
    search: string;
    attribute: string;
}

const ProductsTable = ({ searchMode, search, attribute }: TableProps) => {
    const tableState = useLoading();
    const paginate = usePage().props.paginate as Pagination<Model>;

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
            dataIndex: "name",
            key: "name",
            ...getSortProps("name"),
        },
        {
            title: "كود الصنف",
            dataIndex: "barcode",
            key: "barcode",
        },
        {
            title: "سعر الشراء",
            dataIndex: "buying_price",
            key: "buying_price",
            ...getSortProps("buying_price"),
        },
        {
            title: "سعر البيع",
            dataIndex: "selling_price",
            key: "selling_price",
            ...getSortProps("selling_price"),
        },
        {
            title: "مجموعة الصنف",
            key: "product_group_id",
            render: (record: Model) => (
                <span>{record.product_group?.name ?? "غير مصنف"}</span>
            ),
            ...getSortProps("product_group_id"),
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
                        onClick={() => ProductService.delete(record.id)}
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
            ProductService.search(search, attribute, tableState.stateLoading);
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
        // const productServices = new ProductService();
        // productServices.setTablePaginateSettings(
        //     new ProductTablePaginateSettings(
        //         pagination.current!,
        //         pagination.pageSize!,
        //         sortInfoMapping<Model>(sorter as SorterResult<Model>),
        //         tableState.stateLoading,
        //         search,
        //         attribute
        //     )
        // );
        // if (searchMode) productServices.searchPaginate();
        // else productServices.paginate();
        const service = ModelServices.setTableGlobalSettings({
            page: pagination.current!,
            pageSize: pagination.pageSize!,
            sortInfo: sortInfoMapping<Model>(sorter as SorterResult<Model>),
            stateLoading: tableState.stateLoading,
            search,
            attribute,
        });
        service.updateTableData("paginate");
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
                <ProductForm
                    closeModal={closeModal}
                    modelToEdit={modelToEdit}
                />
            </Modal>
            <Table
                columns={columns}
                rowKey={(record) => record.id!}
                dataSource={paginate.data}
                pagination={{
                    ...tableParams.pagination,
                    total: paginate.total,
                }}
                expandable={{
                    expandedRowRender: (record) => (
                        <div>
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
                                <Descriptions.Item label="الحد الادني للمخزن">
                                    {record.minimum_stock}
                                </Descriptions.Item>
                                <Descriptions.Item label="له تاريخ صلاحية">
                                    {record.has_expire_date ? "نعم" : "لا"}
                                </Descriptions.Item>
                                <Descriptions.Item label="الوحدة">
                                    {record.unit ?? "غير معروف"}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    ),
                    rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                loading={tableState.loading}
                bordered
                onChange={handleTableChange}
                scroll={{ x: true }}
                footer={() => "عدد النتائج : " + paginate.total}
            />
        </>
    );
};

export default ProductsTable;
