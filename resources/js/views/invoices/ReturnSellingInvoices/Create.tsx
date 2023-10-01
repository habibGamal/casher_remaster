import React from "react";
import EditableColumns from "../../../types/EditableColumns";
import ReturnSellInvServices from "../../../Services/Invoices/ReturnSellInvServices";
import DisplayReturnInvoiceCreation from "../../../Components/DisplayReturnInvoiceCreation";
import CreateReturnSellingInvoiceManager from "../../../Management/Invoices/CreateReturnSellingInvoiceManager";

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
        <DisplayReturnInvoiceCreation
            title="فاتورة مرتجع بيع"
            defaultColumns={defaultColumns}
            getManager={CreateReturnSellingInvoiceManager}
        />
    );
}
