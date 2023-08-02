import React from "react";
import BuyInvServices from "../../../services/invoices/BuyInvServices";
import DisplayInvoiceCreation from "../../../components/DisplayInvoiceCreation";
import DeleteButton from "../../../components/DeleteButton";
import EditableColumns from "../../../types/EditableColumns";
import { Descriptions } from "antd";
import SelectSearch from "../../../components/SelectSearch";
import SelectSearchUtils from "../../../services/SelectSearchUtils";

export default function CreateBuyingInvoice() {
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
            editable: true,
        },
        {
            title: "عدد الوحدات",
            dataIndex: "quantity",
            key: "quantity",
            editable: true,
        },
        {
            title: "الاجمالي",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "تحكم",
            dataIndex: "operation",
            renderWithHandler: (handler) => (_, record: any) =>
                (
                    <DeleteButton
                        onClick={() => {
                            handler.onDeleteInvoiceItem(record);
                        }}
                    />
                ),
        },
    ];

    const [stockId, setStockId] = React.useState<string | null>(null);

    return (
        <DisplayInvoiceCreation
            title="فاتورة شراء"
            defaultColumns={defaultColumns}
            getHandler={BuyInvServices.getHandler}
            extendDesicriptionItems={
                <>
                    <Descriptions.Item label="المخزن">
                        <SelectSearch
                            name="stock_id"
                            style={{ width: "12rem" }}
                            onSearch={SelectSearchUtils.getStocks}
                            onChange={(value) => setStockId(value)}
                        />
                    </Descriptions.Item>
                </>
            }
            searchSettings={{
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
            }}
            extraData={{
                stock_id: stockId,
            }}
        />
    );
}