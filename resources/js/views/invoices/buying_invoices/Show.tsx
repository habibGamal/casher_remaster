import React from "react";
import {  Col, Descriptions, Modal, Row, Space, Table } from "antd";
import PageTitle from "../../../components/PageTitle";
interface BuyingInvoiceData {
    id: number;
    total_cost: number;
    created_at: string;
    buying_invoice_items: BuyingInvoiceItemData[];
}
interface BuyingInvoiceItemData {
    id: number;
    buying_invoice_id: number;
    stock_item_id: number;
    quantity: number;
    stock_item: {
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
    data.buying_invoice_items.map((invoice) => ({
        name: invoice.stock_item.product.name,
        barcode: invoice.stock_item.product.barcode,
        buying_price: invoice.stock_item.buying_price,
        quantity: invoice.quantity,
        total_cost: invoice.quantity * invoice.stock_item.buying_price,
    }));
export default function BuyingInvoice({ data }: { data: BuyingInvoiceData }) {
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
