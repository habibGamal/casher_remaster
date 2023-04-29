import { Input } from "antd";
import React, { useState } from "react";
import ProductGroup from "../../../interfaces/ProductGroup";
import ProductGroupServices from "../../../services/ProductGroupServices";
import getFieldsNames from "../../../helpers/getFieldsNames";
import FormComponent from "../../components/FormComponent";

type Model = ProductGroup;

interface FormProps {
    modelToEdit?: Model;
    closeModal: () => void;
}

const ProductGroupForm = ({ modelToEdit, closeModal }: FormProps) => {
    const formItems = [
        { col: true },
        {
            name: "name",
            label: "اسم المجموعة",
            component: <Input />,
        },
    ];

    const formFieldsNames = getFieldsNames(formItems);
    return (
        <FormComponent
            baseRoute={ProductGroupServices.BASE_ROUTE}
            formName="product_group_form"
            formItems={formItems}
            fields={formFieldsNames}
            initValues={modelToEdit}
            modelToEdit={modelToEdit}
            closeModal={closeModal}
        />
    );
};

export default ProductGroupForm;
