import React from "react";
import { Button, Space, Tag } from "antd";
import DisplayModel from "../../../Components/DisplayModel";
import ModelConfig, { ModelColumns } from "../../../Interfaces/ModelConfig";
import ModelContext from "../../../Interfaces/ModelContext";
import ReturnSellInvServices from "../../../Services/Invoices/ReturnSellInvServices";

const modelColumns: ModelColumns[] = [
    {
        title: "رقم الفاتورة",
        dataIndex: "id",
        key: "id",
        sorting: true,
    },
    {
        title: "قيمة الفاتورة",
        dataIndex: "total_cost",
        key: "total_cost",
        render: (value: any) => <Tag color="green" className="text-lg font-bold font-tajawal"> {value} جنيه</Tag>,
    },
    {
        title: "تاريخ الفاتورة",
        dataIndex: "created_at",
        key: "created_at",
        sorting: true,
    },
    {
        title: "تحكم",
        key: "control",
        renderWithCtx: (ctx: ModelContext<any>) => {
            return (record: any) => (
                <Space size="middle">
                    <Button
                        onClick={() => {
                            ReturnSellInvServices.show(record.id);
                        }}
                    >
                        عرض الفاتورة
                    </Button>
                </Space>
            );
        },
    },
];

const config = {
    modelColumns,
    pageTitle: null,
    search: {
        defaultValue: "id",
        options: [
            { label: "رقم الفاتورة", value: "id" },
            { label: "قيمة الفاتورة", value: "total_cost" },
        ],
    },
    exitSearchMode: (ctx: ModelContext<any>) => {
        ctx.search?.exitSearchMode();
        ReturnSellInvServices.index();
    },
    addButton: null,
    slug: "invoices",
    pagination: true,
};

export default function Index() {
    return <DisplayModel className="mx-0" config={config as ModelConfig} />;
}
