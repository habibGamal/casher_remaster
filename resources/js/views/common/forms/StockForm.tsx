import React from "react";
import { Input } from "antd";
import StockServices from "../../../services/stocks/StockServices";
import FormComponent from "../../../components/FormComponent";
import FormProps from "../../../interfaces/FormProps";

const StockForm = ({ modelToEdit, closeModal }: FormProps) => {
    const formItems = [
        { col: true },
        {
            label: "اسم المخزن",
            name: "name",
            component: <Input />,
        },
    ];
    const initValues = {
        name: "",
    };

    return (
        <FormComponent
            baseRoute={StockServices.BASE_ROUTE}
            formName="stock_form"
            formItems={formItems}
            initValues={initValues}
            modelToEdit={modelToEdit}
            closeModal={closeModal}
        />
    );
};

export default StockForm;
