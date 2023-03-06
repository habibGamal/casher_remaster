import { Checkbox, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useState } from "react";
import Product from "../../../app/models/Product";
import Model from "../../../app/models/Model";
import ErrorList from "antd/es/form/ErrorList";
import { Errors, ErrorResult } from "../../../app/config/interfaces";
import { QueryResult } from "tauri-plugin-sql-api";
import useFormError from "../../../hooks/useFormError";
import ProductService from "../../../app/services/ProductService";

const { Option } = Select;



interface ProductGroupFormProps {
  modelToEdit?: Product;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal?: () => void;
}
const ProductGroupForm = ({
  modelToEdit,
  setRefresh,
  closeModal,
}: ProductGroupFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [unitOrWeight, setUnitOrWeight] = useState(0);
  const { setErrors, isError, getErrorMessage } = useFormError();
  const onFinish = async (values: any) => {
    setLoading(true);
    if (modelToEdit) {
      const result = await ProductService.updateProduct(modelToEdit, values);
      handleResult(result, "تم تعديل الصنف بنجاح");
    } else {
      const result = await ProductService.createProduct(values);
      handleResult(result, "تم اضافة الصنف بنجاح");
      if (setRefresh) setRefresh((refresh) => !refresh);
    }
    setLoading(false);
    closeModal!();
  };

  const handleResult = (
    result: Errors | QueryResult | undefined,
    messageOnSucess: string
  ) => {
    if (result && (result as QueryResult).rowsAffected > 0) {
      message.success(messageOnSucess);
      form.resetFields();
    }
    if (result && (result as Errors).errors) {
      setErrors((result as Errors).errors);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={modelToEdit?.toForm()}
      className="p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 "
      layout="vertical"
      scrollToFirstError
    >
      <Row gutter={24} justify="center">
        <Col md={{span:24}} lg={{span:12}} xl={{span:8}}>
          <Form.Item
            name="name"
            label="اسم المجموعة"
            rules={[
              {
                required: true,
                message: "هذا الحقل مطلوب",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item className="grid place-items-center mt-8">
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
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
