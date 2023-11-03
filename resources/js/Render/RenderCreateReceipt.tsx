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
import React, { useReducer, useRef, useState } from "react";
import useSearch from "../Hooks/useSearch";
import mapEditableColumns from "../Helpers/mapEditableColumns";
import EditableColumns from "../types/EditableColumns";
import ColumnTypes from "../types/ColumnTypes";
import { usePage } from "@inertiajs/react";
import SelectSearchUtils from "../Services/SelectSearchUtils";
import { BaseInvoiceItem } from "../Management/InvoiceManager/CreateInvoiceManager";
import useMultiplyKey from "../Hooks/useMultiplyKey";
import EditableRow from "../Components/EditableRow";
import EditableCell from "../Components/EditableCell";
import DeleteButton from "../Components/DeleteButton";
import PageTitle from "../Components/PageTitle";
import SelectSearch from "../Components/SelectSearch";
import selectSearchSlug from "../Helpers/selectSearchSlug";
import Create from "../views/Invoices/SellingInvoices/Create";
import { CreateReceiptFactory } from "../Core/ReceiptCreator/CreateReceipt";
import useLoading from "../Hooks/useLoading";
import useLoading from "../Hooks/useLoading";

// you may wonder why this is not the same style as `DisplayModel`
// `DisplayModel` is quite complicated than this one because it has a lot of features
// it has forms , modals , pagination , search , sorting and a lot of other things
// while this is some how straight forward and simple compered to `DisplayModel`

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
type Props = {
    createReceipt: unknown;
    config: ReceiptConfig;
};

function sourceDistReducer(
    state: {
        sourceId: string | null;
        distId: string | null;
    },
    action: { type: string; payload: string | null }
) {
    switch (action.type) {
        case "source":
            return {
                ...state,
                sourceId: action.payload,
            };
        case "dist":
            return {
                ...state,
                distId: action.payload,
            };
        default:
            return state;
    }
}

export default function RenderCreateReceipt({ config }: Props) {
    const lang = 1;
    const search = useSearch(searchSettings.defaultAttribute);
    const searchInputRef = useRef<InputRef>(null);
    const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>([]);
    const [sourceDist, dispatch] = useReducer(sourceDistReducer, {
        sourceId: null,
        distId: null,
    });

    const sourceDistActions = {
        updateDistId: (id: string | null) => {
            dispatch({ type: "dist", payload: id });
        },
        updateSourceId: (id: string | null) => {
            dispatch({ type: "source", payload: id });
        },
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell<BaseInvoiceItem>,
        },
    };

    useMultiplyKey();

    const totalInvoice = receiptItems.reduce(
        (total, item) => total + item.total,
        0
    );

    const [loading, setLoading] = useState(false);
    const controlLoading = {
        start: () => setLoading(true),
        stop: () => setLoading(false),
    };

    const reset = () => {
        setReceiptItems([]);
        sourceDistActions.updateDistId(null);
        sourceDistActions.updateSourceId(null);
    };

    const searchFocus = () => {
        const timeout = setTimeout(() => {
            searchInputRef.current?.focus();
            clearTimeout(timeout);
        }, 0);
    };

    const createReceipt = CreateReceiptFactory.createReceipt({
        config,
        receiptItems,
        setReceiptItems,
        sourceDist,
        searchData: search.data,
        searchFocus,
        controlLoading,
        reset,
    });

    const defaultColumns: EditableColumns = Object.entries(config.columns).map(
        ([key, column]) => ({
            title: column.title[lang],
            dataIndex: key,
            key: key,
            editable: column.editable,
        })
    );

    const columns = [
        ...mapEditableColumns<any>(
            defaultColumns,
            createReceipt.edit
        ),
        {
            title: "تحكم",
            dataIndex: "operation",
            render: (_: any, record: any) => (
                <DeleteButton
                    onClick={() => {
                        manager.invoiceOperations.remove(record);
                    }}
                />
            ),
        },
    ];
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={config.info.title[lang]} />
            <div className="isolate-2 flex justify-between items-center w-full p-8 gap-8">
                <Descriptions className="w-full" bordered>
                    {manager.displayInvoiceNumber(config.info.receipt_number)}
                    <Descriptions.Item label="الاجمالي">
                        {totalInvoice.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label={config.info.from.title[lang]}>
                        <SelectSearch
                            id={config.info.from.type}
                            style={{ width: "12rem" }}
                            onSearch={selectSearchSlug(config.info.from.type)}
                            onChange={(value) =>
                                sourceDistActions.updateSourceId(value)
                            }
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={config.info.to.title[lang]}>
                        <SelectSearch
                            id={config.info.to.type}
                            style={{ width: "12rem" }}
                            onSearch={selectSearchSlug(config.info.to.type)}
                            onChange={(value) =>
                                sourceDistActions.updateDistId(value)
                            }
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Button
                    loading={loading}
                    onClick={manager.submit.onSubmit}
                    type="primary"
                >
                    {manager.actionBtnTitle()}
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
                        onClick={manager.invoiceOperations.cancelOperation}
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
                    dataSource={manager.invoiceOperations.getInvoiceItems()}
                    pagination={false}
                    loading={loading}
                    bordered
                    scroll={{ x: true }}
                />
            </Col>
        </Row>
    );
}
