import React from "react";
import { Col, Descriptions, Row, Table } from "antd";
import PageTitle from "../../../components/PageTitle";

interface SellingInvoiceItem {
    id: number;
    selling_invoice_id: number;
    product_id: number;
    quantity: number;
    selling_price: number;
    created_at: string;
    updated_at: string;
    stock_item: StockItem;
}

interface StockItem {
    id: number;
    quantity: number;
    stock_id: number;
    box_id: number;
    box: {
        id: number;
        product_id: number;
        buying_price: number;
        product: Product;
    };
}

interface Product {
    id: number;
    name: string;
    barcode: string;
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
        title: "سعر البيع",
        dataIndex: "selling_price",
        key: "selling_price",
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

interface InvoiceItem {
    id: number;
    name: string;
    barcode: string;
    selling_price: number;
    quantity: number;
    total_cash: number;
}

const remapInvoiceData = (data: SellingInvoice) =>
    data.selling_invoice_items.map((invoice) => ({
        id: invoice.stock_item.box.product.id,
        name: invoice.stock_item.box.product.name,
        barcode: invoice.stock_item.box.product.barcode,
        selling_price: invoice.selling_price,
        quantity: invoice.quantity,
        total_cash: invoice.quantity * invoice.selling_price,
    })) as InvoiceItem[];

const mergeInvoiceItems = (invoiceItems: InvoiceItem[]) => {
    const map = new Map<number, InvoiceItem>();
    invoiceItems.forEach((item) => {
        if (map.has(item.id)) {
            const prevItem = map.get(item.id);
            if (prevItem) {
                prevItem.quantity += item.quantity;
                prevItem.total_cash += item.total_cash;
            }
        } else {
            map.set(item.id, item);
        }
    });
    return Array.from(map.values());
};
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
                    dataSource={mergeInvoiceItems(remapInvoiceData(data))}
                    pagination={false}
                />
            </Col>
        </Row>
    );
}
