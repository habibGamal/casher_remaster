import { Checkbox, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useState } from "react";
import useFormError from "../../../hooks/useFormError";
import useLoading from "../../../hooks/useLoading";
import ModelServices from "../../../services/ModelServices";
import ProductGroup from "../../../interfaces/ProductGroup";
import ProductGroupServices from "../../../services/ProductGroupServices";

type Model = ProductGroup;

interface FormProps {
    modelToEdit?: Model;
    closeModal: () => void;
}

const ProductGroupForm = ({ modelToEdit, closeModal }: FormProps) => {
    const [form] = Form.useForm();

    const submitState = useLoading();

    const { setErrors, getError } = useFormError();

    const onFinish = (values: any) => {
        const services = ModelServices.setFormGlobalSettings({
            modelId: modelToEdit?.id,
            form,
            formValues: values,
            stateLoading: submitState.stateLoading,
            closeFormModal: closeModal,
            setErrors,
        });
        if (modelToEdit) services.update(ProductGroupServices.BASE_ROUTE);
        else services.create(ProductGroupServices.BASE_ROUTE);
    };

    return (
        <Form
            form={form}
            name="product_group"
            onFinish={onFinish}
            initialValues={modelToEdit}
            className="p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 "
            layout="vertical"
            scrollToFirstError
        >
            <Row gutter={24} justify="center">
                <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
                    <Form.Item
                        name="name"
                        label="اسم المجموعة"
                        {...getError("name")}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

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

export default ProductGroupForm;
