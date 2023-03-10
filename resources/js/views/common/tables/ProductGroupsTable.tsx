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
import ProductGroupServices, {
    ProductGroupTablePaginateSettings,
} from "../../../services/ProductGroupServices";
import sortInfoMapping from "../../../helpers/sortInfoMapping";
import ProductsInGroup from "../../products/modals/ProductsInGroup";
import { Inertia } from "@inertiajs/inertia";
import useLoading from "../../../hooks/useLoading";
type Model = ProductGroupWithProductsCount;
interface TableProps {
    searchMode: boolean;
    search: string;
    attribute: string;
}

const ProductGroupsTable = ({ searchMode, search, attribute }: TableProps) => {
    const tableState = useLoading();
    const paginate = usePage().props.paginate as Pagination<Model>;

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
        Inertia.reload({
            data: {
                id,
            },
            only: ["productsInGroup"],
            preserveState: true,
        });
        showProductsInGroupModal();
    };

    const columns: ColumnsType<Model> = [
        {
            title: "?????? ????????????????",
            dataIndex: "name",
            key: "name",
            ...getSortProps("name"),
        },
        {
            title: "?????? ?????????????? ???? ????????????????",
            dataIndex: "products_count",
            key: "products_count",
            ...getSortProps("products_count"),
        },
        {
            title: "????????",
            key: "control",
            render: (record: Model) => (
                <Space size="middle">
                    <Button onClick={() => showProductsInGroup(record.id)}>
                        ?????? ?????????? ????????????????
                    </Button>
                    <Button
                        onClick={() => editModel(record)}
                        icon={<EditOutlined className="text-indigo-900" />}
                    />
                    <Button
                        danger
                        type="dashed"
                        onClick={() => {}}
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
            ProductGroupServices.search(
                search,
                attribute,
                tableState.stateLoading
            );
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
        const services = new ProductGroupServices();
        services.setTablePaginateSettings(
            new ProductGroupTablePaginateSettings(
                pagination.current!,
                pagination.pageSize!,
                sortInfoMapping<Model>(sorter as SorterResult<Model>),
                tableState.stateLoading,
                search,
                attribute
            )
        );
        if (searchMode) services.searchPaginate();
        else services.paginate();
    };
    return (
        <>
            <Modal
                title="?????????? ????????????????"
                open={openProductsInGroup}
                onCancel={handleCancelProductsInGroup}
                footer={null}
                destroyOnClose={true}
                width="90%"
            >
                <ProductsInGroup />
            </Modal>
            <Modal
                title="?????????? ????????????????"
                open={openEditForm}
                footer={null}
                onCancel={handleCancelEditForm}
                destroyOnClose={true}
                width="90%"
            >
                {/* <ProductGroupForm
          closeModal={closeEditForm}
          modelToEdit={productToEdit || undefined}
        /> */}
            </Modal>
            <Table
                columns={columns}
                rowKey={(record) => record.id!}
                dataSource={paginate.data}
                pagination={{
                    ...tableParams.pagination,
                    total: paginate.total,
                }}
                loading={tableState.loading}
                bordered
                onChange={handleTableChange}
                footer={() => "?????? ?????????????? : " + paginate.total}
                className="custom-table"
            />
        </>
    );
};

export default ProductGroupsTable;
