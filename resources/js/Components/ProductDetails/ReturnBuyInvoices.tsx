import { Button, Table, Tag, Typography } from "antd";
import React from "react";
import Section from "../Section";
import ProductData from "../../Interfaces/ProductData";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import SellInvServices from "../../Services/Invoices/SellInvServices";
import ReturnSellInvServices from "../../Services/Invoices/ReturnSellInvServices";
const { Text, Link } = Typography;
type Props = {
    productData?: ProductData;
};

export default function ReturnBuyInvoices({ productData }: Props) {
    const columns = [
        {
            title: "رقم الفاتورة",
            dataIndex: "invoice_id",
            key: "invoice_id",
            render: (invoice_id: number) => (
                <Text
                    copyable={{
                        icon: [
                            <CopyOutlined className="mx-4" key="copy-icon" />,
                            <CheckOutlined
                                className="mx-4"
                                key="copied-icon"
                            />,
                        ],
                    }}
                    className=""
                >
                    {invoice_id}
                </Text>
            ),
        },
        {
            title: "الكمية",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number) => (
                <Tag className="text-lg border-none" color="blue">
                    {quantity}
                </Tag>
            ),
        },
        {
            title: "سعر الشراء",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <Tag className="text-lg" color="red">
                    {price}
                </Tag>
            ),
        },
        {
            title: "الفاتورة",
            dataIndex: "invoice_id",
            key: "invoice",
            render: (invoice_id: number) => (
                <Link href={ReturnSellInvServices.BASE_ROUTE + `/${invoice_id}`}>
                    <Button>عرض الفاتورة</Button>
                </Link>
            ),
        },
    ];
    const data = productData?.returnBuyingInvoicesItems.map((item) => ({
        key: item.id,
        invoice_id: item.return_buying_invoice_id,
        quantity: item.quantity,
        price: item.return_price,
    }));
    return (
        <Section className="w-1/2" title="فواتير مرتجع الشراء">
            <Table columns={columns} dataSource={data} />
        </Section>
    );
}
