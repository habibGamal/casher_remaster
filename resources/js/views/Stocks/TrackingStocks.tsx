import { Col, Input, Select, Row, Table } from "antd";
import React, { useState } from "react";
import PageTitle from "../../Components/PageTitle";
import { ModelColumns } from "../../Interfaces/ModelConfig";
import useSearch from "../../Hooks/useSearch";
import { router } from '@inertiajs/react';

interface StockItem {
    id: number;
    quantity: number;
    stock_id: number;
    box_id: number;
    stock: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    };
}

interface Box {
    id: number;
    product_id: number;
    buying_price: number;
    stock_items: StockItem[];
}

interface Product {
    id: number;
    name: string;
    boxes: Box[];
}

type Data = Product;

const modelColumns: ModelColumns[] = [
    {
        title: "أسم الصنف",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "الكمية",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "سعر شراء",
        dataIndex: "buying_price",
        key: "buying_price",
    },
    {
        title: "المخزن",
        dataIndex: "stock",
        key: "stock",
    },
];

export default function TrackingStocks({ data }: { data: Data }) {
    console.log(data);
    const search = useSearch("barcode");
    const [loading, setLoading] = useState(false);
    const searchHandler = () => {
        setLoading(true);
        router.reload({
            data: search.data,
            only: ["data"],
            onSuccess: () => setLoading(false),
        });
    };
    const stockItems = data
        ? data.boxes.flatMap((box) =>
              box.stock_items.map((stockItem) => ({
                  ...stockItem,
                  buying_price: box.buying_price,
              }))
          )
        : [];
    const tableData = stockItems.map((stockItem) => {
        return {
            id: stockItem.id,
            name: data.name,
            quantity: stockItem.quantity,
            buying_price: stockItem.buying_price,
            stock: stockItem.stock.name,
        };
    });

    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="جرد المخازن" />
            <Col span="24" className="isolate">
                <Input
                    id="search_product"
                    allowClear
                    addonBefore={
                        <Select
                            defaultValue={search.data.attribute}
                            onChange={search.changeSearchAttribute}
                            options={[
                                {
                                    label: "الكود",
                                    value: "barcode",
                                },
                            ]}
                        />
                    }
                    placeholder="المنتج"
                    className="placeholder:font-tajawal mb-4"
                    value={search.data.value}
                    onChange={(e) => {
                        search.changeSearchValue(e.target.value);
                    }}
                    onPressEnter={searchHandler}
                />
                <Table
                    columns={modelColumns}
                    rowKey={(record: any) => record.id}
                    dataSource={tableData}
                    pagination={false}
                    loading={loading}
                    bordered
                    scroll={{ x: true }}
                />
            </Col>
        </Row>
    );
}
