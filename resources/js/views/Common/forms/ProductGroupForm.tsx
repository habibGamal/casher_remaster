import { Input } from "antd/es";
import React, { useState } from "react";
import ProductGroupServices from "../../../Services/Products/ProductGroupServices";
import FormComponent from "../../../Components/FormComponent";
import FormProps from "../../../Interfaces/FormProps";

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
