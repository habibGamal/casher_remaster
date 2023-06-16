import { Col, Input, Select, Row, Table} from "antd";
import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { ModelColumns } from "../../interfaces/ModelConfig";
import useSearch from "../../hooks/useSearch";
import { Inertia } from "@inertiajs/inertia";
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

export default function TrackingStocks({ data }: { data: any }) {
    const search = useSearch("barcode");
    const [loading, setLoading] = useState(false);
    const searchHandler = () => {
        setLoading(true);
        Inertia.reload({
            data: search.data,
            only: ["data"],
            onSuccess: () => setLoading(false),
        });
    };
    const stockItems = data?.stock_items.map((item: any) => ({
        ...item,
        key: item.id,
        name: data.name,
        stock: item.stock.name,
    }));

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
                    dataSource={stockItems}
                    pagination={false}
                    loading={loading}
                    bordered
                    scroll={{ x: true }}
                />
            </Col>
        </Row>
    );
}
