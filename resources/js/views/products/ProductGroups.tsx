import React from "react";
import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProductGroupForm from "../common/forms/ProductGroupForm";
import ProductGroupServices from "../../Services/Products/ProductGroupServices";
import ModelContext from "../../Interfaces/ModelContext";
import ModelConfig, { ModelColumns } from "../../Interfaces/ModelConfig";
import ModelGeneralServices from "../../Services/ModelGeneralServices";
import DisplayModel from "../../Components/DisplayModel";
import ProductsInGroup from "./Modals/ProductsInGroup";
import { router } from '@inertiajs/react';

interface ModelType {
    id: number;
    name: string;
    products_count: number;
}
const modelColumns: ModelColumns[] = [
    {
        title: "أسم المجموعة",
        dataIndex: "name",
        key: "name",
        sorting: true,
    },
    {
        title: "عدد الاصناف في المجموعة",
        dataIndex: "products_count",
        key: "products_count",
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
                            const currentUrl = window.location.href.replace(
                                window.location.origin,
                                ""
                            );
                            ProductGroupServices.getProductsInGroup(record.id);
                            ctx.freeModal?.showModal();
                            ctx.setFreeModalSettings!({
                                children: <ProductsInGroup />,
                                onClose: () => router.get(currentUrl),
                                title: "اصناف المجموعة",
                            });
                        }}
                    >
                        عرض اصناف المجموعة
                    </Button>
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
                        onClick={() =>
                            ModelGeneralServices.delete(
                                record.id!,
                                ProductGroupServices.BASE_ROUTE
                            )
                        }
                        icon={<DeleteOutlined />}
                    />
                </Space>
            );
        },
    },
];

const config = {
    modelColumns,
    pageTitle: "مجموعات الاصناف",
    search: {
        defaultValue: "name",
    },
    exitSearchMode: (ctx: ModelContext<any>) => {
        ctx.search?.exitSearchMode();
        ProductGroupServices.index();
    },
    addButton: "اضافة مجموعة",
    slug: "productGroups",
    pagination: true,
};
export default function ProductGroups() {
    return (
        <DisplayModel
            ModelForm={ProductGroupForm}
            config={config as ModelConfig}
        />
    );
}
