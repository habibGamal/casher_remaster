import React from "react";
import { Button, Descriptions, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DisplayModel from "../components/DisplayModel";
import ModelConfig, { ModelColumns } from "../../interfaces/ModelConfig";
import ModelGeneralServices from "../../services/ModelGeneralServices";
import ProductServices from "../../services/ProductServices";
import ModelContext from "../../interfaces/ModelContext";
import { ProductWithProductGroup } from "../../interfaces/Product";
import ProductForm from "../common/forms/ProductForm";
type ModelType = ProductWithProductGroup;
const modelColumns: ModelColumns[] = [
    {
        title: "أسم الصنف",
        dataIndex: "name",
        key: "name",
        sorting: true,
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
        sorting: true,
    },
    {
        title: "سعر البيع",
        dataIndex: "selling_price",
        key: "selling_price",
        sorting: true,
    },
    {
        title: "مجموعة الصنف",
        key: "product_group_id",
        render: (record: ModelType) => (
            <span>{record.product_group?.name ?? "غير مصنف"}</span>
        ),
        sorting: true,
    },
    {
        title: "تحكم",
        key: "control",
        renderWithCtx: (ctx: ModelContext<any>) => {
            return (record: ModelType) => (
                <Space size="middle">
                    <Button
                        onClick={() => {
                            ctx.setModelToEdit!(record);
                            ctx.modalForm?.showModal();
                        }}
                        icon={<EditOutlined className="text-indigo-900" />}
                    />
                    <Button
                        danger
                        type="dashed"
                        onClick={() => {
                            ModelGeneralServices.delete(
                                record.id!,
                                ProductServices.BASE_ROUTE
                            );
                        }}
                        icon={<DeleteOutlined />}
                    />
                </Space>
            );
        },
    },
];

const config = {
    modelColumns,
    pageTitle: "أضافة الاصناف",
    search: {
        defaultValue: "name",
        options: [
            { label: "اسم الصنف", value: "name" },
            { label: "كود الصنف", value: "barcode" },
        ],
    },
    exitSearchMode: (ctx: ModelContext<any>) => {
        ctx.search?.exitSearchMode();
        ProductServices.index();
    },
    addButton: "أضافة صنف",
    sorting: ["name", "code", "price"],
    slug: "products",
    pagination: true,
    expandedRowRender: (record: ModelType) => (
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
    ),
};

export default function Products() {
    return (
        <DisplayModel ModelForm={ProductForm} config={config as ModelConfig} />
    );
}
