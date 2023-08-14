import { Space } from "antd";
import { Button, Form, Row } from "antd";
import React, { useEffect } from "react";
import ModelGeneralServices from "../Services/ModelGeneralServices";
import { FORM_LAYOUT_1 } from "../Config/layouts";
import formFieldsReshape from "../Helpers/formFieldsReshape";
import useLoading from "../Hooks/useLoading";
import useFormError from "../Hooks/useFormError";
import getFieldsNames from "../Helpers/getFieldsNames";

interface FormProps {
    baseRoute: string;
    absRoute?: string;
    formName: string;
    formItems: any[];
    initValues: any;
    modelToEdit?: any;
    closeModal: () => void;
    submitBtnText?: string;
}

const FormComponent = ({
    baseRoute,
    absRoute,
    formName,
    formItems,
    initValues,
    modelToEdit,
    closeModal,
    submitBtnText = "حفظ",
}: FormProps) => {
    const [form] = Form.useForm();

    const submitState = useLoading();

    const { setErrors, errors } = useFormError();

    const onFinish = (values: any) => {
        const services = ModelGeneralServices.setFormGlobalSettings({
            modelId: modelToEdit?.id,
            form,
            formValues: values,
            stateLoading: submitState.stateLoading,
            closeFormModal: closeModal,
            setErrors,
        });
        if (modelToEdit) services.update(baseRoute);
        else services.create(baseRoute,absRoute);
    };

    useEffect(() => {
        if (errors) {
            const fields = getFieldsNames(formItems);
            form.setFields(
                fields.map((field) => ({ name: field, errors: [] }))
            );
            form.setFields(
                Object.keys(errors).map((key) => ({
                    name: key,
                    errors: [errors[key]],
                }))
            );
        }
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
                {formFieldsReshape(formItems)}
            </Row>
            <Form.Item className="grid place-items-center mt-8">
                <Space>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={submitState.loading}
                    >
                        {submitBtnText}
                    </Button>
                    <Button htmlType="button" onClick={() => {}}>
                        اعادة ملئ المدخلات
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default FormComponent;
