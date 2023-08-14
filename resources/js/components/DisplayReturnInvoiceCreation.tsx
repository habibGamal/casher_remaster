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
import useSearch from "../Hooks/useSearch";
import mapEditableColumns from "../Helpers/mapEditableColumns";
import EditableColumns from "../types/EditableColumns";
import ColumnTypes from "../types/ColumnTypes";
import { usePage } from "@inertiajs/inertia-react";
import CreateReturnSellingInvoiceManager from "../Management/invoices/CreateReturnSellingInvoiceManager";
import CreateReturnBuyingInvoiceManager from "../Management/invoices/CreateReturnBuyingInvoiceManager";

interface Item {
    id: number;
    key: string;
    total: number;
}
// you may wonder why this is not the same style as `DisplayModel`
// `DisplayModel` is quite complicated than this one because it has a lot of features
// it has forms , modals , pagination , search , sorting and a lot of other things
// while this is some how straight forward and simple compered to `DisplayModel`
type Props = {
    title: string;
    defaultColumns: EditableColumns;
    getManager:
        | typeof CreateReturnSellingInvoiceManager
        | typeof CreateReturnBuyingInvoiceManager;
};
export default function DisplayReturnInvoiceCreation({
    title,
    defaultColumns,
    getManager,
}: Props) {
    const searchSettings = {
        id: "invoice_id",
        defaultAttribute: "invoice_id",
        placeholder: "رقم الفاتورة",
        options: [
            {
                label: "رقم فاتورة الشراء",
                value: "invoice_id",
            },
        ],
    };
    const search = useSearch(searchSettings.defaultAttribute);
    const [invoiceItems, setInvoiceItems] = React.useState<Item[]>([]);
    const [additionalData, setAdditionalData] = React.useState<any>({});

    const returnInvoiceNumber = usePage().props.invoice_number as number | null;

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell<Item>,
        },
    };

    const totalInvoice = invoiceItems.reduce(
        (total, item) => total + item.total,
        0
    );

    const [loading, setLoading] = useState(false);

    const manager = new getManager({
        additionalData,
        setAdditionalData,
        invoiceItems: invoiceItems as any,
        setInvoiceItems: setInvoiceItems as any,
        search,
        loading,
        setLoading,
    });

    const columns = mapEditableColumns(
        defaultColumns,
        manager.returnInvoiceOperations.edit as any
    );

    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={title} />
            <div className="isolate-2 flex justify-between items-center w-full p-8 gap-8">
                <Descriptions className="w-full" bordered>
                    <Descriptions.Item label="رقم الفاتورة">
                        {returnInvoiceNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="الاجمالي">
                        {totalInvoice.toFixed(2)}
                    </Descriptions.Item>
                </Descriptions>
                <Button
                    loading={loading}
                    onClick={manager.submit.onSubmit}
                    type="primary"
                >
                    انشاء الفاتورة
                </Button>
            </div>
            <Col span="24" className="isolate">
                <div className="flex gap-6 mb-6">
                    <Input
                        id={searchSettings.id}
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
                        onClick={
                            manager.returnInvoiceOperations.cancelOperation
                        }
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
                    dataSource={manager.returnInvoiceOperations.getInvoiceItems()}
                    pagination={false}
                    loading={loading}
                    bordered
                    scroll={{ x: true }}
                />
            </Col>
        </Row>
    );
}
