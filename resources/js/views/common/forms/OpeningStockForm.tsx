import { Checkbox, DatePicker, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useState } from "react";
import Product, { ProductDB } from "../../../app/models/Product";
import Model from "../../../app/models/Model";
import ErrorList from "antd/es/form/ErrorList";
import { Errors, ErrorResult } from "../../../app/config/interfaces";
import { QueryResult } from "tauri-plugin-sql-api";
import useFormError from "../../../hooks/useFormError";
import ProductService from "../../../app/services/ProductService";
import SelectSearch, { SetOptions } from "../../components/SelectSearch";

const { Option } = Select;

interface OpeningStockFormProps {
  modelToEdit?: Product;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal?: () => void;
}
const OpeningStockForm = ({
  modelToEdit,
  setRefresh,
  closeModal,
}: OpeningStockFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setErrors, isError, getErrorMessage } = useFormError();
  const onFinish = async (values: any) => {
    console.log(values);

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

  const [codeOrName, setCodeOrName] = useState<"name" | "barcode">("name");

  const onSearch = async (value: string, setOptions: SetOptions) => {
    const res = (await Product.select(
      ["id", codeOrName],
      `${codeOrName} like '%${value}%'`
    )) as ProductDB[];
    const products = res.map((productDB) => new Product({ productDB }));

    setOptions(
      products.map((product) => ({
        value: `${product.id!}`,
        label: product[codeOrName]!,
      }))
    );
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
        <Form.Item initialValue={"name"} name="name_or_code">
          <Radio.Group onChange={(e) => setCodeOrName(e.target.value)}>
            <Radio.Button value={"name"}>بحث بالاسم</Radio.Button>
            <Radio.Button value={"barcode"}>بحث باكود</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Row>
      <Row gutter={24} justify="center">
        <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item
            name="product_id"
            label="المنتج"
            rules={[
              {
                required: true,
                message: "هذا الحقل مطلوب",
              },
            ]}
          >
            <SelectSearch onSearch={onSearch} placeholder="ابحث عن منتج" />
          </Form.Item>
          <Form.Item
            name="expire_date"
            label="تاريخ الصالحية"
            rules={[
              {
                required: true,
                message: "هذا الحقل مطلوب",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item
            name="stock_id"
            initialValue={1}
            label="المخزن"
            rules={[{ required: true, message: "هذا الحقل مطلوب" }]}
          >
            <Select>
              <Option value={1}>غير مصنف</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="الكمية"
            rules={[
              {
                required: true,
                message: "هذا الحقل مطلوب",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
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

export default OpeningStockForm;
