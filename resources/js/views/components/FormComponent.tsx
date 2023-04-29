import { Checkbox, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { ProductWithProductGroup } from "../../interfaces/Product";
import ModelGeneralServices from "../../services/ModelGeneralServices";
import ProductServices from "../../services/ProductServices";
import SelectSearch, { SetOptions } from "./SelectSearch";
import { FORM_COLUMNS_LAYOUT, FORM_LAYOUT_1 } from "../../config/layouts";
import formFieldsReshape from "../../helpers/formFieldsReshape";
import useLoading from "../../hooks/useLoading";
import useFormError from "../../hooks/useFormError";


interface FormProps {
    baseRoute: string;
    formName: string;
    formItems: any[];
    fields: string[];
    initValues: any;
    modelToEdit?: any;
    closeModal: () => void;
}

const FormComponent = ({
    baseRoute,
    formName,
    formItems,
    fields,
    initValues,
    modelToEdit,
    closeModal,
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
        else services.create(baseRoute);
    };

    useEffect(() => {
        if (errors) {
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
            className="p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 "
            layout="vertical"
            scrollToFirstError
        >
            <Row gutter={24} justify='center'>{formFieldsReshape(formItems)}</Row>
            <Form.Item className="grid place-items-center mt-8">
                <Space>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={submitState.loading}
                    >
                        حفظ
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
