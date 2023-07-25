import React from "react";
import DisplayInvoiceCreation from "../../../components/DisplayInvoiceCreation";
import EditableColumns from "../../../types/EditableColumns";
import ReturnSellInvServices from "../../../services/invoices/ReturnSellInvServices";

export default function CreateReturnSellingInvoice() {
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
            title: "سعر بيع الوحدة",
            dataIndex: "selling_price",
            key: "selling_price",
        },
        {
            title: "سعر مرتجع الوحدة",
            dataIndex: "return_price",
            key: "return_price",
            editable: true,
        },
        {
            title: "عدد الوحدات المتاحة",
            dataIndex: "available_quantity",
            key: "available_quantity",
        },
        {
            title: "عدد الوحدات المرتجعة",
            dataIndex: "return_quantity",
            key: "return_quantity",
            editable: true,
        },
        {
            title: "الاجمالي",
            dataIndex: "total",
            key: "total",
        },
    ];

    return (
        <DisplayInvoiceCreation
            title="فاتورة مرتجع بيع"
            defaultColumns={defaultColumns}
            getHandler={ReturnSellInvServices.getHandler}
            searchSettings={{
                id: "invoice_id",
                defaultAttribute: "invoice_id",
                placeholder: "رقم الفاتورة",
                options: [
                    {
                        label: "رقم فاتورة البيع",
                        value: "invoice_id",
                    },
                ],
            }}
        />
    );
}
