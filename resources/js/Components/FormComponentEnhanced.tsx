import { FormInstance, Input, Select, Space, Typography } from "antd";
import { Button, Form, Row } from "antd";
import React, { useEffect, useMemo } from "react";
import ModelGeneralServices from "../Services/ModelGeneralServices";
import { FORM_LAYOUT_1 } from "../Config/layouts";
import formFieldsReshape from "../Helpers/formFieldsReshape";
import useLoading from "../Hooks/useLoading";
import useFormError from "../Hooks/useFormError";
import getFieldsNames from "../Helpers/getFieldsNames";
import { router, usePage } from "@inertiajs/react";
import fromGenerator, { FormSchema } from "../Helpers/formGenerator";
import FormErrorMapping from "../Helpers/ErrorMapping";

interface FormProps {
    submitRoute: string;
    formName: string;
    initValues: any;
    modelToEdit?: any;
    closeModal: () => void;
    submitBtnText?: string;
}

const FormComponentEnhanced = ({
    submitRoute,
    formName,
    initValues,
    modelToEdit,
    closeModal,
    submitBtnText = "حفظ",
}: FormProps) => {
    const { form: formSchema } = usePage().props;

    const [form] = Form.useForm();

    const formItems = useMemo(
        () => formFieldsReshape(fromGenerator(formSchema as FormSchema, form)),
        []
    );

    const submitState = useLoading();

    const { errors } = usePage().props;

    const onFinish = (values: any) => {
        console.log(submitRoute)
        router.post(submitRoute, values, {
            onStart: () => submitState.stateLoading.onStart(),
            onFinish: () => submitState.stateLoading.onFinish(),
        });
    };

    useEffect(() => {
        const formErrorMapping = new FormErrorMapping(form);
        formErrorMapping.clearFormErrors();
        const isErrors = Object.keys(errors).length > 0;
        if (isErrors) return formErrorMapping.updateErrors(errors);
    }, [errors]);

    return (
        <Form
            {...FORM_LAYOUT_1}
            form={form}
            name={formName}
            onFinish={onFinish}
            initialValues={initValues}
            className="p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 dark:bg-transparent dark:border-none"
            layout="vertical"
            scrollToFirstError
        >
            <Row gutter={24} justify="center">
                {formItems}
            </Row>
            <Form.Item key="buttons" className="grid place-items-center mt-8">
                <Space>
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        loading={submitState.loading}
                    >
                        {submitBtnText}
                    </Button>
                    <Button key="reset" htmlType="button" onClick={() => {}}>
                        اعادة ملئ المدخلات
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default FormComponentEnhanced;
