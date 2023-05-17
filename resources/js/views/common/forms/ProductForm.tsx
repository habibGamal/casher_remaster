import { Checkbox, Radio, Select } from "antd";
import { Input, InputNumber } from "antd";
import React, { useState } from "react";
import ProductServices from "../../../services/ProductServices";
import { ProductWithProductGroup } from "../../../interfaces/Product";
import SelectSearch, { SetOptions } from "../../components/SelectSearch";
import FormComponent from "../../components/FormComponent";
import getFieldsNames from "../../../helpers/getFieldsNames";
import SelectSearchUtils from "../../../services/SelectSearchUtils";

type Model = ProductWithProductGroup;

interface FormProps {
    modelToEdit?: Model;
    closeModal: () => void;
}

const ProductForm = ({ modelToEdit, closeModal }: FormProps) => {

    const [unitOrWeight, setUnitOrWeight] = useState(0);

    const formItems = [
        { col: true },
        {
            name: "name",
            label: "أسم الصنف",
            component: <Input />,
        },
        {
            name: "barcode",
            label: "كود الصنف",
            component: <Input />,
        },
        {
            name: "product_group_id",
            label: "مجموعة الصنف",
            component: (
                <SelectSearch
                    name="product_group_id"
                    onSearch={SelectSearchUtils.getProductGroups}
                    placeholder="أختر مجموعة الصنف"
                    defaultValue={
                        modelToEdit
                            ? modelToEdit?.product_group?.name
                            : undefined
                    }
                />
            ),
        },
        { col: true },
        {
            name: "last_buying_price",
            label: "اخر سعر شراء",
            component: <InputNumber min={0} style={{ width: "100%" }} />,
        },
        {
            name: "selling_price",
            label: "سعر البيع",
            component: <InputNumber min={0} style={{ width: "100%" }} />,
        },
        {
            name: "minimum_stock",
            label: "الحد الادنى من المخزون",
            component: <InputNumber min={0} style={{ width: "100%" }} />,
        },
        { col: true },
        {
            name: "unit_or_weight",
            label: "وحدة أو وزن",
            component: (
                <Radio.Group onChange={(e) => setUnitOrWeight(e.target.value)}>
                    <Radio value={0}>وحدة</Radio>
                    <Radio value={1}>وزن</Radio>
                </Radio.Group>
            ),
        },
        {
            name: "unit",
            label: "الوحدة",
            component: (
                <Select
                    placeholder="أختر الوحدة"
                    disabled={unitOrWeight ? true : false}
                >
                    <Select.Option value="قطعة">قطعة</Select.Option>
                    <Select.Option value="علبة">علبة</Select.Option>
                    <Select.Option value="كرتونة">كرتونة</Select.Option>
                    <Select.Option value="طن">طن</Select.Option>
                    <Select.Option value="كيلو">كيلو</Select.Option>
                    <Select.Option value="جرام">جرام</Select.Option>
                    <Select.Option value="مليغرام">مليغرام</Select.Option>
                    <Select.Option value="متر">متر</Select.Option>
                    <Select.Option value="سم">سم</Select.Option>
                    <Select.Option value="مليمتر">مليمتر</Select.Option>
                    <Select.Option value="لتر">لتر</Select.Option>
                    <Select.Option value="ملي لتر">ملي لتر</Select.Option>
                </Select>
            ),
        },
        {
            name: "has_expire_date",
            component: <Checkbox>يمتلك صلاحية</Checkbox>,
            valuePropName: "checked",
        },
    ];

    const initValues = modelToEdit
        ? modelToEdit
        : {
              has_expire_date: false,
              unit_or_weight: unitOrWeight,
          };

    const fields = getFieldsNames(formItems);

    return (
        <FormComponent
            baseRoute={ProductServices.BASE_ROUTE}
            formName="products_form"
            formItems={formItems}
            initValues={initValues}
            fields={fields}
            modelToEdit={modelToEdit}
            closeModal={closeModal}
        />
    );
};

export default ProductForm;
