import React from "react";
import DisplayInvoiceCreation from "../../../Components/DisplayInvoiceCreation";
import EditableColumns from "../../../types/EditableColumns";
import CreateBuyingInvoiceManager from "../../../Management/Invoices/CreateBuyingInvoiceManager";

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
    ];

    return (
        <DisplayInvoiceCreation
            title="فاتورة شراء"
            defaultColumns={defaultColumns}
            getManager={CreateBuyingInvoiceManager}
        />
    );
}
