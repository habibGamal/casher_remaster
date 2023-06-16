import React, { useState } from "react";
import { Button, Col, Descriptions, Modal, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PageTitle from "../../../components/PageTitle";
interface SellingInvoiceItem {
  id: number;
  selling_invoice_id: number;
  product_id: number;
  quantity: number;
  buying_price: number;
  selling_price: number;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    barcode: string;
  };
}

interface SellingInvoice {
  id: number;
  total_cost: number;
  total_cash: number;
  created_at: string;
  updated_at: string;
  selling_invoice_items: SellingInvoiceItem[];
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
        dataIndex: "total_cash",
        key: "total_cash",
    },
];
const remapInvoiceData = (data: SellingInvoice) =>
    data.selling_invoice_items.map((invoice) => ({
        name: invoice.product.name,
        barcode: invoice.product.barcode,
        selling_price: invoice.selling_price,
        buying_price: invoice.buying_price,
        quantity: invoice.quantity,
        total_cash: invoice.quantity * invoice.selling_price,
    }));
export default function BuyingInvoice({ data }: { data: SellingInvoice }) {
    console.log(data);
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={`عرض فاتورة مبيعات`} />
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
