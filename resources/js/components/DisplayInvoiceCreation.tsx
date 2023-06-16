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
import React, { useEffect, useRef, useState } from "react";
import PageTitle from "./PageTitle";
import EditableCell from "./EditableCell";
import EditableRow from "./EditableRow";
import useSearch from "../hooks/useSearch";
import mapEditableColumns from "../helpers/mapEditableColumns";
import { GetInvoiceHandler } from "../types/InvoiceGetHandler";
import EditableColumns from "../types/EditableColumns";
import ColumnTypes from "../types/ColumnTypes";
import { usePage } from "@inertiajs/inertia-react";

interface Item {
    id: number;
    key: string;
    total: number;
}
// you may wonder why this is not the same style as `DisplayModel`
// `DisplayModel` is quite complicated than this one because it has a lot of features
// it has forms , modals , pagination , search , sorting and a lot of other things
// while this is some how straight forward and simple compered to `DisplayModel`
export default function DisplayInvoiceCreation({
    title,
    defaultColumns,
    getHandler,
    searchSettings,
    extendDesicriptionItems = null,
    extraData,
}: {
    title: string;
    defaultColumns: EditableColumns;
    getHandler: GetInvoiceHandler;
    searchSettings: {
        id: string;
        placeholder: string;
        defaultAttribute?: string;
        options: { label: string; value: string }[];
    };
    extendDesicriptionItems?: JSX.Element | null;
    extraData?: any;
}) {
    const search = useSearch(searchSettings.defaultAttribute);
    const searchInputRef = useRef<InputRef>(null);
    const [invoiceItems, setInvoiceItems] = React.useState<Item[]>([]);

    const [invoiceData, setInvoiceData] = useState<any>({});

    const invoiceNumber = usePage().props.invoice_number as number;

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell<Item>,
        },
    };

    useEffect(() => {
        const event = (e: KeyboardEvent) => {
            if (e.code === "NumpadMultiply") {
                e.preventDefault();
                const lastItemQuantity = document.querySelector(
                    ".editable-quantity"
                ) as HTMLElement;
                lastItemQuantity?.click();
            }
        };
        window.addEventListener("keydown", event);
        return () => window.removeEventListener("keydown", event);
    }, []);

    const totalInvoice = invoiceItems.reduce(
        (total, item) => total + item.total,
        0
    );

    const [loading, setLoading] = useState(false);

    const handler = getHandler({
        invoiceData,
        setInvoiceData,
        invoiceItems,
        setInvoiceItems,
        search,
        searchInputRef,
        loading,
        setLoading,
        extraData,
    });

    const columns = mapEditableColumns(
        defaultColumns,
        handler.onEditInvoiceItem,
        handler
    );

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
                    {extendDesicriptionItems}
                </Descriptions>
                <Button onClick={handler.onSubmit} type="primary">
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
                        onPressEnter={handler.onSearch}
                    />
                    <Button
                        onClick={handler.cancelOperation}
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
                    rowKey={(record: any) =>
                        handler.getRowKey(record).toString()
                    }
                    dataSource={handler.getInvoiceItems()}
                    pagination={false}
                    loading={loading}
                    bordered
                    scroll={{ x: true }}
                />
            </Col>
        </Row>
    );
}
