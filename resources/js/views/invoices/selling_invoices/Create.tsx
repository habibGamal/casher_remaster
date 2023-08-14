import React from "react";
import DisplayInvoiceCreation from "../../../Components/DisplayInvoiceCreation";
import DeleteButton from "../../../Components/DeleteButton";
import EditableColumns from "../../../types/EditableColumns";
import SellInvServices from "../../../Services/Invoices/SellInvServices";
import CreateSellingInvoiceManager from "../../../Management/invoices/CreateSellingInvoiceManager";

export default function Create() {
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
            title="فاتورة بيع"
            defaultColumns={defaultColumns}
            getManager={CreateSellingInvoiceManager}
        />
    );
}
