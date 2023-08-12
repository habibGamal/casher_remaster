import React from "react";
import EditableColumns from "../../types/EditableColumns";
import DisplayInvoiceCreation from "../../components/DisplayInvoiceCreation";
import CreateOpeningStockManager from "../../management/OpeningStockManager";


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
            title="الارصدة الافتتاحية"
            defaultColumns={defaultColumns}
            getManager={CreateOpeningStockManager}
        />
    );
}
