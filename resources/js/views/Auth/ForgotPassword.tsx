import { Input } from "antd";
import React from "react";
import FormComponent from "../../Components/FormComponent";
import GuestLayout from "../../Layouts/GuestLayout";

const Login = () => {
    const formItems = [
        { col: true },
        {
            name: "email",
            label: "الايميل",
            component: <Input />,
        },
    ];

    return (
        <>
            <FormComponent
                baseRoute="/forgot-password"
                absRoute="/forgot-password"
                formName="products_form"
                formItems={formItems}
                initValues={undefined}
                modelToEdit={undefined}
                closeModal={() => {}}
                submitBtnText="ارسال رسالة الى البريد الالكتروني"
            />
        </>
    );
};
Login.layout = (page: any) => (
    <GuestLayout children={page} title="نسيت كلمة المرور ؟" />
);
export default Login;
