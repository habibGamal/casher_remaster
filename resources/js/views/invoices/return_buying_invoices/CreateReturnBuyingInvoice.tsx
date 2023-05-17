import React from "react";
import BuyingInvoiceServices from "../../../services/BuyingInvoiceServices";
import DisplayInvoiceCreation from "../../components/DisplayInvoiceCreation";
import EditableColumns from "../../../types/EditableColumns";
import ReturnBuyingInvoiceServices from "../../../services/ReturnBuyingInvoiceServices";

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
            title="فاتورة مرتجع شراء"
            defaultColumns={defaultColumns}
            getHandler={ReturnBuyingInvoiceServices.getHandler}
            searchSettings={{
                id: "invoice_id",
                defaultAttribute: "invoice_id",
                placeholder: "رقم الفاتورة",
                options: [
                    {
                        label: "رقم فاتورة الشراء",
                        value: "invoice_id",
                    },
                ],
            }}
        />
    );
}
