import { Checkbox, DatePicker, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useState } from "react";
import useFormError from "../../../hooks/useFormError";
import SelectSearch, { SetOptions } from "../../../components/SelectSearch";
import FormComponent from "../../../components/FormComponent";
import OpeningStockServices from "../../../services/products/OpeningStockServices";
import getFieldsNames from "../../../helpers/getFieldsNames";
import OpeningStockItem from "../../../interfaces/OpeningStockItem";
import FormProps from "../../../interfaces/FormProps";

type Model = OpeningStockItem;

const OpeningStockForm = ({ modelToEdit, closeModal }: FormProps) => {
    const onSearch = async (value: string, setOptions: SetOptions) => {};

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
                <SelectSearch onSearch={onSearch} placeholder="ابحث عن منتج" />
            ),
        },
        {
            name: "stock_id",
            label: "المخزن",
            component: (
                <SelectSearch onSearch={onSearch} placeholder="المخزن" />
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
