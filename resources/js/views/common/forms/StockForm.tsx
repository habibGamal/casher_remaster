import React from "react";
import { Input } from "antd";
import StockServices from "../../../Services/Stocks/StockServices";
import FormComponent from "../../../Components/FormComponent";
import FormProps from "../../../Interfaces/FormProps";

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
