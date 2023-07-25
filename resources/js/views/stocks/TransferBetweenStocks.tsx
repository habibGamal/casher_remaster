import React, { useState } from "react";
import {
    Button,
    Col,
    Descriptions,
    Input,
    Row,
    Select,
    Table,
    Transfer,
    message,
} from "antd";
import PageTitle from "../../components/PageTitle";
import SelectSearch from "../../components/SelectSearch";
import SelectSearchUtils from "../../services/SelectSearchUtils";
import EditableRow from "../../components/EditableRow";
import EditableCell from "../../components/EditableCell";
import EditableColumns from "../../types/EditableColumns";
import ColumnTypes from "../../types/ColumnTypes";
import useSearch from "../../hooks/useSearch";
import { Inertia } from "@inertiajs/inertia";
import detectERR from "../../helpers/detectERR";
import mapEditableColumns from "../../helpers/mapEditableColumns";
import DeleteButton from "../../components/DeleteButton";
import flashHasError from "../../helpers/flashHasError";
interface Product {
    id: number;
    name: string;
    barcode: string;
    stock_items: StockItem[];
}

interface StockItem {
    id: number;
    quantity: number;
    stock_id: number;
    box_id: number;
    product_id: number;
    buying_price: number;
}
interface TableData {
    key: number | string;
    id: number;
    name: string;
    barcode: string;
    quantity: number;
    transfer_quantity: number;
    children: {
        key: string;
        id: number;
        name: string;
        barcode: string;
        price: number;
        quantity: number;
        transfer_quantity: number;
    }[];
}
export default function TransferBetweenStocks() {
    const defaultColumns: EditableColumns = [
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
            title: "سعر شراء الوحدة",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "الكمية المتاحة",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "الكمية المراد تحويلها",
            dataIndex: "transfer_quantity",
            key: "transfer_quantity",
            editable: true,
        },
        {
            title: "تحكم",
            dataIndex: "operation",
            render: (_: any, record: any) => {
                if (record.children)
                    return (
                        <DeleteButton
                            onClick={() => removeProduct(record.key)}
                        />
                    );
                return null;
            },
        },
    ];

    const [fromStockId, setFromStockId] = React.useState<string | null>(null);
    const [toStockId, setToStockId] = React.useState<string | null>(null);

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell<any>,
        },
    };
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<TableData[]>([]);
    const onSearch = () => {
        Inertia.reload({
            data: {
                ...search.data,
                stock_id: fromStockId,
            },
            only: ["product"],
            preserveState: true,
            onSuccess: (page) => {
                let product = page.props.product as Product;
                if (detectERR(product)) return;
                updateTableData(product);
            },
        });
    };

    const updateTableData = (product: Product) => {
        const isProductExist = tableData.find(
            (data) => data.key === product.id
        );
        if (isProductExist) return replaceProduct(product);
        setTableData((data) => [...data, mapProductToTableData(product)]);
    };

    const replaceProduct = (product: Product) => {
        setTableData((data) =>
            data.map((item) => {
                if (item.key === product.id) {
                    return mapProductToTableData(product);
                }
                return item;
            })
        );
    };

    const mapProductToTableData = (product: Product) => ({
        key: product.id,
        id: product.id,
        name: product.name,
        barcode: product.barcode,
        quantity: product.stock_items.reduce(
            (acc, item) => acc + item.quantity,
            0
        ),
        transfer_quantity: 0,
        children: product.stock_items.map((stock_item) => ({
            key: product.id + `${stock_item.id}`,
            id: stock_item.id,
            name: "-",
            barcode: "-",
            price: stock_item.buying_price,
            quantity: stock_item.quantity,
            transfer_quantity: 0,
        })),
    });

    const onCancelOperation = () => {
        setTableData([]);
    };

    const search = useSearch();

    const onEdit = (record: TableData) => {
        if (record.transfer_quantity > record.quantity)
            return message.error(
                "لا يمكن ان تكون الكمية المراد تحويلها اكبر من الكمية المتاحة"
            );
        updateRecord(record);
    };

    const updateRecord = (record: TableData) => {
        setTableData((data) =>
            data.map((item) => {
                if (item.children.find((child) => child.key === record.key)) {
                    const children = item.children.map((child) => {
                        if (child.key === record.key) {
                            return {
                                ...child,
                                transfer_quantity: record.transfer_quantity,
                            };
                        }
                        return child;
                    });
                    const transfer_quantity = children.reduce(
                        (acc, child) =>
                            acc +
                            parseFloat(child.transfer_quantity.toString()),
                        0
                    );
                    return {
                        ...item,
                        children,
                        transfer_quantity,
                    };
                }
                return item;
            })
        );
    };

    const removeProduct = (key: number) => {
        setTableData((data) => data.filter((item) => item.key !== key));
    };

    const submit = () => {
        setLoading(true);
        Inertia.post(
            "/transfer-between-stocks",
            {
                from_stock_id: fromStockId,
                to_stock_id: toStockId,
                stock_items: tableData
                    .flatMap((item) => item.children)
                    .map((item) => ({
                        id: item.id,
                        quantity: item.transfer_quantity,
                    })) as any,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setLoading(false);
                    if (flashHasError(page)) return;
                    setTableData([]);
                },
            }
        );
    };

    const columns = mapEditableColumns(defaultColumns, onEdit);

    const transferProcessBegin = tableData.length > 0;
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="التحويل بين المخازن" />
            <div className="isolate-2 flex justify-between items-center w-full p-8 gap-8">
                <Descriptions className="w-full" bordered>
                    <Descriptions.Item label="من المخزن">
                        <SelectSearch
                            name="from_stock_id"
                            style={{ width: "12rem" }}
                            onSearch={SelectSearchUtils.getStocks}
                            onChange={(value) => setFromStockId(value)}
                            disabled={transferProcessBegin}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="الى المخزن">
                        <SelectSearch
                            name="from_stock_id"
                            style={{ width: "12rem" }}
                            onSearch={SelectSearchUtils.getStocks}
                            onChange={(value) => setToStockId(value)}
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Button onClick={submit} type="primary">
                    نقل
                </Button>
            </div>
            <Col span="24" className="isolate">
                <div className="flex gap-6 mb-6">
                    <Input
                        id="search_product"
                        allowClear
                        addonBefore={
                            <Select
                                defaultValue={search.data.attribute}
                                onChange={search.changeSearchAttribute}
                                options={[
                                    {
                                        label: "الاسم",
                                        value: "name",
                                    },
                                    {
                                        label: "الكود",
                                        value: "barcode",
                                    },
                                ]}
                            />
                        }
                        placeholder="المنتج"
                        className="placeholder:font-tajawal"
                        value={search.data.value}
                        onChange={(e) => {
                            search.changeSearchValue(e.target.value);
                        }}
                        onPressEnter={onSearch}
                    />
                    <Button
                        onClick={onCancelOperation}
                        className="mx-auto"
                        danger
                        type="primary"
                    >
                        الغاء العملية
                    </Button>
                </div>
                <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    columns={columns as ColumnTypes}
                    rowKey={(record: any) => record.key.toString()}
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
