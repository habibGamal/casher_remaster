import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import useSortTable from "../../../hooks/useSortTable";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import { usePage } from "@inertiajs/inertia-react";
import Pagination from "../../../interfaces/Pagination";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import Product from "../../../interfaces/Product";
import { ProductGroupWithProducts } from "../../../interfaces/ProductGroup";
import useLoading from "../../../hooks/useLoading";

interface TableProps {
    searchMode: boolean;
    search: string;
    attribute: string;
}
type Model = Partial<Product>;
const ProductsInGroupTable = ({
    searchMode,
    search,
    attribute,
}: TableProps) => {
    const tableState = useLoading();

    const productsInGroup = usePage().props
        .productsInGroup as ProductGroupWithProducts;

    const columns: ColumnsType<Model> = [
        {
            title: "أسم الصنف",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "كود الصنف",
            dataIndex: "barcode",
            key: "barcode",
        },
        {
            title: "تحكم",
            key: "control",
            render: (record: Product) => (
                <Space size="middle">
                    <Button danger icon={<DeleteOutlined />}>
                        ازالة من المجموعة
                    </Button>
                </Space>
            ),
        },
    ];

    useWhileTyping(
        () => {
            // ProductGroupServices.search(search, attribute, stateLoading);
        },
        searchMode,
        [searchMode, search]
    );

    // loading until data fetched
    useEffect(() => {
        if (!productsInGroup) tableState.setLoading(true);
        else tableState.setLoading(false);
    }, [productsInGroup]);

    return (
        <>
            <Table
                columns={columns}
                rowKey={(record) => record.id!}
                dataSource={productsInGroup ? productsInGroup.products : []}
                loading={tableState.loading}
                bordered
                footer={() =>
                    "عدد النتائج : " + productsInGroup
                        ? productsInGroup.products.length
                        : 0
                }
            />
        </>
    );
};

export default ProductsInGroupTable;
