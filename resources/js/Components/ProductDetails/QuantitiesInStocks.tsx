import { Table, Tag } from "antd";
import React from "react";
import Section from "../Section";
import ProductData from "../../Interfaces/ProductData";

type Props = {
    productData?: ProductData;
};

export default function QuantitiesInStocks({ productData }: Props) {
    const columns = [
        {
            title: "المخزن",
            dataIndex: "stock",
            key: "stock",
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
                <Tag className="text-lg" color="volcano">
                    {price}
                </Tag>
            ),
        },
    ];
    const data = productData?.boxes.flatMap((box) =>
        box.stock_items.map((stockItem) => ({
            key: stockItem.id,
            id: stockItem.stock.id,
            stock: stockItem.stock.name,
            quantity: stockItem.quantity,
            price: box.buying_price,
        }))
    );
    return (
        <Section className="w-1/2" title="الكميات الموجودة بالمخازن">
            <Table columns={columns} dataSource={data} />
        </Section>
    );
}
