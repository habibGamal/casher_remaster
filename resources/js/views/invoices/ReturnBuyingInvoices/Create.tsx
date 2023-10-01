import React from "react";
import EditableColumns from "../../../types/EditableColumns";
import ReturnBuyInvServices from "../../../Services/Invoices/ReturnBuyInvServices";
import DisplayReturnInvoiceCreation from "../../../Components/DisplayReturnInvoiceCreation";
import CreateReturnBuyingInvoiceManager from "../../../Management/Invoices/CreateReturnBuyingInvoiceManager";

export default function CreateReturnBuyingInvoice() {
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
            dataIndex: "buying_price",
            key: "buying_price",
        },
        {
            title: "سعر مرتجع الوحدة",
            dataIndex: "return_price",
            key: "return_price",
            editable: true,
        },
        {
            title: "المخزن",
            dataIndex: "stock",
            key: "stock",
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
        <DisplayReturnInvoiceCreation
            title="فاتورة مرتجع شراء"
            defaultColumns={defaultColumns}
            getManager={CreateReturnBuyingInvoiceManager}
        />
    );
}
