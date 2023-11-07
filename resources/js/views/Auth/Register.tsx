import { Checkbox, Radio, Select, Typography } from "antd";
import { Input, InputNumber } from "antd";
import React, { useState } from "react";
import ProductServices from "../../Services/Products/ProductServices";
import SelectSearch from "../../Components/SelectSearch";
import FormComponent from "../../Components/FormComponent";
import GuestLayout from "../../Layouts/GuestLayout";

const Register = () => {
    const formItems = [
        { col: true },
        {
            name: "name",
            label: "الاسم",
            component: <Input />,
        },
        {
            name: "email",
            label: "الايميل",
            component: <Input />,
        },
        {
            name: "password",
            label: "كلمة المرور",
            component: <Input.Password />,
        },
        {
            name: "password_confirmation",
            label: "تأكيد كلمة المرور",
            component: <Input.Password />,
        },
    ];

    return (
        <FormComponent
            baseRoute="/register"
            absRoute="/register"
            formName="products_form"
            formItems={formItems}
            initValues={undefined}
            modelToEdit={undefined}
            closeModal={() => {}}
            submitBtnText="تسجيل"
        />
    );
};
Register.layout = (page: any) => (
    <GuestLayout children={page} title="تسجيل مستخدم جديد" />
);
export default Register;
