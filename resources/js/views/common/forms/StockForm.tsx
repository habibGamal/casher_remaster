import React from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import useLoading from "../../../hooks/useLoading";
import Stock from "../../../interfaces/Stock";
import useFormError from "../../../hooks/useFormError";
import ModelGeneralServices from "../../../services/ModelGeneralServices";
import StockServices from "../../../services/StockServices";
type Model = Stock;

interface FormProps {
    modelToEdit?: Model;
    closeModal: () => void;
}
const StockForm = ({ modelToEdit, closeModal }: FormProps) => {
    const [form] = Form.useForm();

    const submitState = useLoading();

    const { setErrors, getError } = useFormError();

    const onFinish = (values: any) => {
        const services = ModelGeneralServices.setFormGlobalSettings({
            modelId: modelToEdit?.id,
            form,
            formValues: values,
            stateLoading: submitState.stateLoading,
            closeFormModal: closeModal,
            setErrors,
        });
        if (modelToEdit) services.update(StockServices.BASE_ROUTE);
        else services.create(StockServices.BASE_ROUTE);
    };
    return (
        <Form
            form={form}
            name="register"
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
                        label="اسم المخزن"
                        {...getError("name")}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                {/* <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
                    <Form.Item
                        name="manager"
                        label="المسؤول"
                        rules={[
                            {
                                required: true,
                                message: "هذا الحقل مطلوب",
                            },
                        ]}
                    >
                        <SelectSearch onSearch={onSearch} placeholder="بحث" />
                    </Form.Item>
                </Col> */}
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

export default StockForm;
