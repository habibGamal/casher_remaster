import { Checkbox, DatePicker, Radio, Select, Space, message } from "antd/es";
import { Button, Col, Form, Input, InputNumber, Row } from "antd/es";
import React, { useState } from "react";
import useFormError from "../../../Hooks/useFormError";
import SelectSearch, { SetOptions } from "../../../Components/SelectSearch";
import FormComponent from "../../../Components/FormComponent";
import OpeningStockServices from "../../../Services/Products/OpeningStockServices";
import getFieldsNames from "../../../Helpers/getFieldsNames";
import FormProps from "../../../Interfaces/FormProps";
import SelectSearchUtils from "../../../Services/SelectSearchUtils";

const OpeningStockForm = ({ modelToEdit, closeModal }: FormProps) => {

    const [searchWith, setSearchWith] = useState<"name" | "barcode">("barcode");
    const formItems: any[] = [
        { col: true },
        {
            name: "name_or_code",
            label: "طريقة البحث في المنتجات",
            component: (
                <Radio.Group onChange={(e) => setSearchWith(e.target.value)}>
                    <Radio value="barcode">باكود</Radio>
                    <Radio value="name">باسم المنتج</Radio>
                </Radio.Group>
            ),
        },
        {
            name: "product_id",
            label: "المنتج",
            component: (
                <SelectSearch onSearch={SelectSearchUtils.getProductByBarcode} placeholder="ابحث عن منتج" />
            ),
        },
        {
            name: "stock_id",
            label: "المخزن",
            component: (
                <SelectSearch onSearch={SelectSearchUtils.getStocks} placeholder="المخزن" />
            ),
        },
        { col: true },
        {
            name: "buying_price",
            label: "سعر الشراء",
            component: <InputNumber min={0} style={{ width: "100%" }} />,
        },
        {
            name: "quantity",
            label: "الكمية",
            component: <InputNumber min={0} style={{ width: "100%" }} />,
        },
    ];

    const initValues = modelToEdit
        ? modelToEdit
        : {
              name_or_code: searchWith,
          };
    return (
        <FormComponent
            baseRoute={OpeningStockServices.BASE_ROUTE}
            formName="opening_stock_form"
            formItems={formItems}
            initValues={initValues}
            modelToEdit={modelToEdit}
            closeModal={closeModal}
        />
    );
};

export default OpeningStockForm;
