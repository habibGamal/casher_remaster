import {
    Button,
    Col,
    Descriptions,
    Input,
    InputRef,
    Row,
    Select,
    Table,
} from "antd";
import React, { useRef, useState } from "react";
import PageTitle from "./PageTitle";
import EditableCell from "./EditableCell";
import EditableRow from "./EditableRow";
import useSearch from "../hooks/useSearch";
import mapEditableColumns from "../helpers/mapEditableColumns";
import EditableColumns from "../types/EditableColumns";
import ColumnTypes from "../types/ColumnTypes";
import { usePage } from "@inertiajs/inertia-react";
import SelectSearch from "./SelectSearch";
import SelectSearchUtils from "../services/SelectSearchUtils";
import CreateBuyingInvoiceManager from "../management/invoices/CreateBuyingInvoiceManager";
import CreateSellingInvoiceManager from "../management/invoices/CreateSellingInvoiceManager";
import DeleteButton from "./DeleteButton";
import { BaseInvoiceItem } from "../management/invoices/CreateInvoiceManager";
import useMultiplyKey from "../hooks/useMultiplyKey";

// you may wonder why this is not the same style as `DisplayModel`
// `DisplayModel` is quite complicated than this one because it has a lot of features
// it has forms , modals , pagination , search , sorting and a lot of other things
// while this is some how straight forward and simple compered to `DisplayModel`
type Props = {
    title: string;
    defaultColumns: EditableColumns;
    getManager:
        | typeof CreateBuyingInvoiceManager
        | typeof CreateSellingInvoiceManager;
};
export default function DisplayInvoiceCreation({
    title,
    defaultColumns,
    getManager,
}: Props) {
    const searchSettings = {
        id: "search_product",
        defaultAttribute: "barcode",
        placeholder: "المنتج",
        options: [
            {
                label: "الاسم",
                value: "name",
            },
            {
                label: "الكود",
                value: "barcode",
            },
        ],
    };
    const search = useSearch(searchSettings.defaultAttribute);
    const searchInputRef = useRef<InputRef>(null);
    const [invoiceItems, setInvoiceItems] = React.useState<BaseInvoiceItem[]>(
        []
    );

    const invoiceNumber = usePage().props.invoice_number as number;

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell<BaseInvoiceItem>,
        },
    };

    useMultiplyKey();

    const totalInvoice = invoiceItems.reduce(
        (total, item) => total + item.total,
        0
    );

    const [loading, setLoading] = useState(false);

    const [stockId, setStockId] = React.useState<string | null>(null);

    const manager = new getManager({
        invoiceItems: invoiceItems as any,
        setInvoiceItems: setInvoiceItems as any,
        stockId,
        setStockId,
        search,
        searchInputRef,
        loading,
        setLoading,
    });

    const columns = [
        ...mapEditableColumns<any>(defaultColumns, manager.edit),
        {
            title: "تحكم",
            dataIndex: "operation",
            render: (record: any) => (
                <DeleteButton
                    onClick={() => {
                        manager.remove(record);
                    }}
                />
            ),
        },
    ];

    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={title} />
            <div className="isolate-2 flex justify-between items-center w-full p-8 gap-8">
                <Descriptions className="w-full" bordered>
                    <Descriptions.Item label="رقم الفاتورة">
                        {invoiceNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="الاجمالي">
                        {totalInvoice.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="المخزن">
                        <SelectSearch
                            name="stock_id"
                            style={{ width: "12rem" }}
                            onSearch={SelectSearchUtils.getStocks}
                            onChange={(value) => setStockId(value)}
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Button onClick={manager.submit.onSubmit} type="primary">
                    انشاء الفاتورة
                </Button>
            </div>
            <Col span="24" className="isolate">
                <div className="flex gap-6 mb-6">
                    <Input
                        id={searchSettings.id}
                        ref={searchInputRef}
                        allowClear
                        addonBefore={
                            <Select
                                defaultValue={search.data.attribute}
                                onChange={search.changeSearchAttribute}
                                options={searchSettings.options}
                            />
                        }
                        placeholder={searchSettings.placeholder}
                        className="placeholder:font-tajawal"
                        value={search.data.value}
                        onChange={(e) => {
                            search.changeSearchValue(e.target.value);
                        }}
                        onPressEnter={manager.search.onSearch}
                    />
                    <Button
                        onClick={manager.cancelOperation}
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
                    dataSource={manager.getInvoiceItems()}
                    pagination={false}
                    loading={loading}
                    bordered
                    scroll={{ x: true }}
                />
            </Col>
        </Row>
    );
}
