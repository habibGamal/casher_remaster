import { Button, Space } from "antd";
import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import OpeningStockForm from "../common/forms/OpeningStockForm";
import ModelConfig, { ModelColumns } from "../../interfaces/ModelConfig";
import DisplayModel from "../../components/DisplayModel";
import ModelContext from "../../interfaces/ModelContext";
import ModelGeneralServices from "../../services/ModelGeneralServices";
import OpeningStockServices from "../../services/products/OpeningStockServices";
import OpeningStockItem from "../../interfaces/OpeningStockItem";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";
type Model = OpeningStockItem;
const modelColumns: ModelColumns[] = [
    {
        title: "أسم الصنف",
        dataIndex: ["stock_item", "product", "name"],
        key: "name",
        sorting: true,
    },
    {
        title: "كود الصنف",
        dataIndex: ["stock_item", "product", "barcode"],
        key: "barcode",
    },
    {
        title: "المخزن",
        dataIndex: ["stock_item", "stock", "name"],
        key: "stock_name",
    },
    {
        title: "الكمية",
        dataIndex: ["stock_item", "quantity"],
        key: "buying_price",
        sorting: true,
    },
    {
        title: "تاريخ الصلاحية",
        dataIndex: ["stock_item", "expiration_date"],
        key: "minimum_stock",
    },
    {
        title: "تحكم",
        key: "control",
        render: (record: Model) => (
            <Space size="middle">
                <EditButton onClick={() => {}} />
                <DeleteButton
                    onClick={() =>
                        ModelGeneralServices.delete(
                            record.id!,
                            OpeningStockServices.BASE_ROUTE
                        )
                    }
                />
            </Space>
        ),
    },
];

const config = {
    modelColumns,
    pageTitle: "الارصدة الافتتاحية",
    search: {
        defaultValue: "barcode",
        options: [
            { label: "اسم الصنف", value: "name" },
            { label: "كود الصنف", value: "barcode" },
            { label: "المخزن", value: "stock_id" },
        ],
    },
    exitSearchMode: (ctx: ModelContext<any>) => {
        ctx.search?.exitSearchMode();
        OpeningStockServices.index();
    },
    addButton: "اضافة رصيد افتتاحي",
    slug: "openingStockItems",
};
export default function OpeningStocks() {
    return (
        <>
            <DisplayModel
                ModelForm={OpeningStockForm}
                config={config as ModelConfig}
            />
        </>
    );
}
