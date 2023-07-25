import { Button, Table, Tag, Typography } from "antd";
import React from "react";
import Section from "../Section";
import ProductData from "../../interfaces/ProductData";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import SellInvServices from "../../services/invoices/SellInvServices";
const { Text, Link } = Typography;
type Props = {
    productData?: ProductData;
};

export default function SellInvoices({ productData }: Props) {
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
            title: "سعر البيع",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <Tag className="text-lg" color="green">
                    {price}
                </Tag>
            ),
        },
        {
            title: "الفاتورة",
            dataIndex: "invoice_id",
            key: "invoice",
            render: (invoice_id: number) => (
                <Link href={SellInvServices.BASE_ROUTE + `/${invoice_id}`}>
                    <Button>عرض الفاتورة</Button>
                </Link>
            ),
        },
    ];
    const data = productData?.sellingInvoicesItems.map((item) => ({
        key: item.id,
        invoice_id: item.selling_invoice_id,
        quantity: item.quantity,
        price: item.selling_price,
    }));
    return (
        <Section className="w-1/2" title="فواتير البيع">
            <Table columns={columns} dataSource={data} />
        </Section>
    );
}
