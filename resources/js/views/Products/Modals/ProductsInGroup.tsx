import React, { useState } from "react";
import { Button, Col, Modal, Row, Space } from "antd/es";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib";
import ModelContext from "../../../Interfaces/ModelContext";
import ModelConfig from "../../../Interfaces/ModelConfig";
import DisplayModelAsModal from "../../../Components/DisplayModelAsModal";
import ProductGroupServices from "../../../Services/Products/ProductGroupServices";
import ProductServices from "../../../Services/Products/ProductServices";
const modelColumns = [
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
        render: (record: any) => (
            <Space size="middle">
                <Button
                    danger
                    onClick={() => {
                        ProductServices.removeProductFromGroup(record.id);
                    }}
                    icon={<DeleteOutlined />}
                >
                    ازالة من المجموعة
                </Button>
            </Space>
        ),
    },
];

const config = {
    modelColumns,
    search: {
        defaultValue: "name",
        options: [
            { value: "name", label: "اسم الصنف" },
            { value: "barcode", label: "كود الصنف" },
        ],
    },
    exitSearchMode: (ctx: ModelContext<any>) => {
        ctx.search?.exitSearchMode();
        // just getting the id from url
        const id = new URLSearchParams(window.location.search).get(
            "productGroupId"
        );
        if (!id) return;
        ProductGroupServices.getProductsInGroup(parseInt(id));
    },
    addButton: null,
    slug: "productsInGroup",
};

export default function ProductsInGroup() {
    return <DisplayModelAsModal config={config as ModelConfig} />;
}
