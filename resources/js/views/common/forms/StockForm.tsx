import React from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import useLoading from "../../../hooks/useLoading";
import Stock from "../../../interfaces/Stock";
import useFormError from "../../../hooks/useFormError";
import ModelGeneralServices from "../../../services/ModelGeneralServices";
import StockServices from "../../../services/stocks/StockServices";
import FormComponent from "../../../components/FormComponent";
import FormProps from "../../../interfaces/FormProps";

const StockForm = ({ modelToEdit, closeModal }: FormProps) => {
    const formItems = [
        { col: true },
        {
            label: "اسم المخزن",
            name: "store_name",
            component: <Input />,
        },
    ];
    const initValues = {
        store_name: "",
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
