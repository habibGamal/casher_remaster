import React, { useState } from "react";
import { Button, Col, Modal, Row, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProductGroupForm from "../common/forms/ProductGroupForm";
import ProductGroupServices from "../../services/products/ProductGroupServices";
import ModelContext from "../../interfaces/ModelContext";
import { ProductGroupWithProductsCount } from "../../interfaces/ProductGroup";
import ModelConfig, { ModelColumns } from "../../interfaces/ModelConfig";
import ModelGeneralServices from "../../services/ModelGeneralServices";
import DisplayModel from "../../components/DisplayModel";
import ProductsInGroup from "./modals/ProductsInGroup";
import { Inertia } from "@inertiajs/inertia";

type ModelType = ProductGroupWithProductsCount;
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
                                onClose: () => Inertia.get(currentUrl),
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
