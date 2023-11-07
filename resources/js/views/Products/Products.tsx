import React from "react";
import { Descriptions, Space } from "antd/es";
import DisplayModel from "../../Components/DisplayModel";
import ModelConfig, { ModelColumns } from "../../Interfaces/ModelConfig";
import ModelGeneralServices from "../../Services/ModelGeneralServices";
import ProductServices from "../../Services/Products/ProductServices";
import ModelContext from "../../Interfaces/ModelContext";
import ProductForm from "../Common/forms/ProductForm";
import DeleteButton from "../../Components/DeleteButton";
import EditButton from "../../Components/EditButton";
type ModelType = {
    id?: number;
    name: string;
    barcode: string;
    last_buying_price: number;
    selling_price: number;
    minimum_stock: number;
    has_expire_date: boolean;
    unit: string;
    product_group: {
        name: string;
    }
};

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
        title: "اخر سعر شراء",
        dataIndex: "last_buying_price",
        key: "last_buying_price",
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
                    <EditButton
                        onClick={() => {
                            ctx.setModelToEdit!(record);
                            ctx.modalForm?.showModal();
                        }}
                    />
                    <DeleteButton
                        onClick={() => {
                            ModelGeneralServices.delete(
                                record.id!,
                                ProductServices.BASE_ROUTE
                            );
                        }}
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
