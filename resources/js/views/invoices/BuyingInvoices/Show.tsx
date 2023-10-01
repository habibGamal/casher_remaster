import React from "react";
import {  Col, Descriptions, Modal, Row, Space, Table } from "antd";
import PageTitle from "../../../Components/PageTitle";
interface BuyingInvoiceData {
    id: number;
    total_cost: number;
    created_at: string;
    buying_invoice_items: BuyingInvoiceItemData[];
}
interface BuyingInvoiceItemData {
    id: number;
    buying_invoice_id: number;
    box_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    box: {
        id: number;
        product_id: number;
        buying_price: number;
        product: {
            id: number;
            name: string;
            barcode: string;
        };
    };
}

const columns = [
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
        title: "سعر الشراء",
        dataIndex: "buying_price",
        key: "buying_price",
    },
    {
        title: "عدد الوحدات",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "الاجمالي",
        dataIndex: "total_cost",
        key: "total_cost",
    },
];
const remapInvoiceData = (data: BuyingInvoiceData) =>
    data.buying_invoice_items.map((invoice_item) => ({
        name: invoice_item.box.product.name,
        barcode: invoice_item.box.product.barcode,
        buying_price: invoice_item.box.buying_price,
        quantity: invoice_item.quantity,
        total_cost: invoice_item.quantity * invoice_item.box.buying_price,
    }));
export default function BuyingInvoice({ data }: { data: BuyingInvoiceData }) {
    console.log(data);

    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={`عرض فاتورة مشتريات`} />
            <Col span="24" className="isolate-2">
                <Descriptions className="w-full" bordered>
                    <Descriptions.Item label="رقم الفاتورة">
                        {data.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="الاجمالي">
                        {data.total_cost}
                    </Descriptions.Item>
                    <Descriptions.Item label="تاريخ الفاتورة">
                        {data.created_at}
                    </Descriptions.Item>
                </Descriptions>
            </Col>
            <Col span="24" className="isolate">
                <Table
                    columns={columns}
                    dataSource={remapInvoiceData(data)}
                    pagination={false}
                />
            </Col>
        </Row>
    );
}
