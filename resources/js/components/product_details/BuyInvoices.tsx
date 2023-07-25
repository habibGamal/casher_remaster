import { Button, Table, Tag, Typography } from "antd";
import React from "react";
import Section from "../Section";
import ProductData from "../../interfaces/ProductData";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import SellInvServices from "../../services/invoices/SellInvServices";
import BuyInvServices from "../../services/invoices/BuyInvServices";
const { Text, Link } = Typography;
type Props = {
    productData?: ProductData;
};

export default function BuyInvoices({ productData }: Props) {
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
                <Link href={BuyInvServices.BASE_ROUTE + `/${invoice_id}`}>
                    <Button>عرض الفاتورة</Button>
                </Link>
            ),
        },
    ];
    const data = productData?.buyingInvoicesItems.map((item) => ({
        key: item.id,
        invoice_id: item.buying_invoice_id,
        quantity: item.quantity,
        price: productData.boxes.find((box) => box.id == item.box_id)
            ?.buying_price,
    }));
    return (
        <Section className="w-1/2" title="فواتير الشراء">
            <Table columns={columns} dataSource={data} />
        </Section>
    );
}
