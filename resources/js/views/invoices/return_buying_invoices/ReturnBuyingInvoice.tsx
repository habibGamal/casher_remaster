import React from "react";
import { Col, Descriptions, Row, Table } from "antd";
import PageTitle from "../../components/PageTitle";
interface ReturnBuyingInvoiceData {
    id: number;
    buying_invoice_id: number;
    total_cash: number;
    created_at: string;
    return_buying_invoice_items: ReturnBuyingInvoiceItemData[];
}
interface ReturnBuyingInvoiceItemData {
    id: number;
    quantity: number;
    return_price: number;
    product: {
        id: number;
        name: string;
        barcode: string;
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
        title: "سعر المرتجع",
        dataIndex: "return_price",
        key: "return_price",
    },
    {
        title: "عدد الوحدات المرتجعة",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "الاجمالي",
        dataIndex: "total_cost",
        key: "total_cost",
    },
];
const remapInvoiceData = (data: ReturnBuyingInvoiceData) =>
    data.return_buying_invoice_items.map((invoice) => ({
        name: invoice.product.name,
        barcode: invoice.product.barcode,
        return_price: invoice.return_price,
        quantity: invoice.quantity,
        total_cost: invoice.quantity * invoice.return_price,
    }));
export default function ReturnBuyingInvoice({ data }: { data: any }) {
    console.log(data);

    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={`عرض فاتورة مرتجع مشتريات`} />
            <Col span="24" className="isolate-2">
                <Descriptions className="w-full" bordered>
                    <Descriptions.Item label="رقم الفاتورة">
                        {data.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="الاجمالي">
                        {data.total_cash}
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
