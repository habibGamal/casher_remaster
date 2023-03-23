import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useModal from "../../../hooks/useModal";
import useSortTable from "../../../hooks/useSortTable";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import ProductGroupForm from "../forms/ProductGroupForm";
import { ProductGroupWithProductsCount } from "../../../interfaces/ProductGroup";
import Pagination from "../../../interfaces/Pagination";
import { usePage } from "@inertiajs/inertia-react";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import sortInfoMapping from "../../../helpers/sortInfoMapping";
import ProductsInGroup from "../../products/modals/ProductsInGroup";
import { Inertia } from "@inertiajs/inertia";
import useLoading from "../../../hooks/useLoading";
import ModelServices from "../../../services/ModelServices";
import ProductGroupServices from "../../../services/ProductGroupServices";
type Model = ProductGroupWithProductsCount;
interface TableProps {
    searchMode: boolean;
    search: string;
    attribute: string;
}

const ProductGroupsTable = ({ searchMode, search, attribute }: TableProps) => {
    const tableState = useLoading();
    const productGroups = usePage().props.productGroups as Pagination<Model>;

    const { tableParams, updateTableParams, resetPagination } =
        useTablePagination<Model>();

    const [modelToEdit, setModelToEdit] = useState<Model | undefined>(
        undefined
    );

    const {
        open: openEditForm,
        closeModal: closeEditForm,
        showModal: showEditForm,
        handleCancel: handleCancelEditForm,
    } = useModal();

    const {
        open: openProductsInGroup,
        handleCancel: handleCancelProductsInGroup,
        showModal: showProductsInGroupModal,
    } = useModal();

    const { getSortProps, resetSortState } = useSortTable<Model>("created_at");

    const editModel = (model: Model) => {
        setModelToEdit(model);
        showEditForm();
    };

    const showProductsInGroup = (id: number) => {
        ProductGroupServices.getProductsInGroup(id);
        showProductsInGroupModal();
    };

    const columns: ColumnsType<Model> = [
        {
            title: "أسم المجموعة",
            dataIndex: "name",
            key: "name",
            ...getSortProps("name"),
        },
        {
            title: "عدد الاصناف في المجموعة",
            dataIndex: "products_count",
            key: "products_count",
            ...getSortProps("products_count"),
        },
        {
            title: "تحكم",
            key: "control",
            render: (record: Model) => (
                <Space size="middle">
                    <Button onClick={() => showProductsInGroup(record.id)}>
                        عرض اصناف المجموعة
                    </Button>
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
                                ProductGroupServices.BASE_ROUTE
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
                search,
                attribute,
            });
            service.updateTableData("productGroups");
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
        service.updateTableData("productGroups");
    };
    return (
        <>
            <Modal
                title="اصناف المجموعة"
                open={openProductsInGroup}
                onCancel={handleCancelProductsInGroup}
                footer={null}
                destroyOnClose={true}
                width="90%"
            >
                <ProductsInGroup />
            </Modal>
            <Modal
                title="تعديل المجموعة"
                open={openEditForm}
                footer={null}
                onCancel={handleCancelEditForm}
                destroyOnClose={true}
                width="90%"
            >
                <ProductGroupForm
                    closeModal={closeEditForm}
                    modelToEdit={modelToEdit || undefined}
                />
            </Modal>
            <Table
                columns={columns}
                rowKey={(record) => record.id!}
                dataSource={productGroups.data}
                pagination={{
                    ...tableParams.pagination,
                    total: productGroups.total,
                }}
                loading={tableState.loading}
                bordered
                onChange={handleTableChange}
                footer={() => "عدد النتائج : " + productGroups.total}
                className="custom-table"
            />
        </>
    );
};

export default ProductGroupsTable;
