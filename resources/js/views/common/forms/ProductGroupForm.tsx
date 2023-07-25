import { Input } from "antd";
import React, { useState } from "react";
import ProductGroupServices from "../../../services/products/ProductGroupServices";
import FormComponent from "../../../components/FormComponent";
import FormProps from "../../../interfaces/FormProps";

const ProductGroupForm = ({ modelToEdit, closeModal }: FormProps) => {
    const formItems = [
        { col: true },
        {
            name: "name",
            label: "اسم المجموعة",
            component: <Input />,
        },
    ];

    return (
        <FormComponent
            baseRoute={ProductGroupServices.BASE_ROUTE}
            formName="product_group_form"
            formItems={formItems}
            initValues={modelToEdit}
            modelToEdit={modelToEdit}
            closeModal={closeModal}
        />
    );
};

export default ProductGroupForm;
