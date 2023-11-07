import { Button } from "antd";
import { Input } from "antd";
import React from "react";
import FormComponent from "../../Components/FormComponent";
import GuestLayout from "../../Layouts/GuestLayout";
import { router } from '@inertiajs/react';

const Login = () => {
    const formItems = [
        { col: true },
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
    ];

    return (
        <>
            <FormComponent
                baseRoute="/login"
                absRoute="/login"
                formName="products_form"
                formItems={formItems}
                initValues={undefined}
                modelToEdit={undefined}
                closeModal={() => {}}
                submitBtnText="تسجيل"
            />
            <Button
                className="mx-auto block"
                onClick={() => {
                    router.get("/forgot-password");
                }}
            >
                نسيت كلمة المرور؟
            </Button>
        </>
    );
};
Login.layout = (page: any) => (
    <GuestLayout children={page} title="تسجيل دخول" />
);
export default Login;
