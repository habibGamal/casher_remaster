import { Button, Col, Form, Input, Radio, Row, Typography } from "antd";
import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import TrackingStocksTable from "../common/tables/TrackingStocksTable";
import SelectSearch, { SetOptions } from "../components/SelectSearch";
import { SaveOutlined } from "@ant-design/icons";
export default function TrackingStocks() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Finish:", values);
  };
  const onSearch = async (value: string, setOptions: SetOptions) => {};

  const [codeOrName, setCodeOrName] = useState<"name" | "barcode">("name");

  return (
    <Row gutter={[0, 25]} className="m-8">
      <PageTitle name="جرد المخازن" />
      <Col span="24" className="isolate">
        <Form
          form={form}
          name="choose_stock"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item label="رقم الجرد">
            <span className="ant-form-text">1631</span>
          </Form.Item>
          <Form.Item
            name="stock_id"
            label="المخزن"
            rules={[
              {
                required: true,
                message: "هذا الحقل مطلوب",
              },
            ]}
          >
            <SelectSearch
              onSearch={onSearch}
              placeholder="اسم المخزن"
              style={{ minWidth: "300px" }}
            />
          </Form.Item>
        </Form>
        <Form
          form={form}
          name="products"
          layout="inline"
          onFinish={onFinish}
          className="mt-8"
        >
          <Form.Item initialValue={"name"} name="name_or_code">
            <Radio.Group onChange={(e) => setCodeOrName(e.target.value)}>
              <Radio.Button value={"name"}>بحث بالاسم</Radio.Button>
              <Radio.Button value={"barcode"}>بحث باكود</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {codeOrName === "barcode" && (
            <Form.Item
              name="barcode"
              label="الكود"
              rules={[
                {
                  required: true,
                  message: "هذا الحقل مطلوب",
                },
              ]}
            >
              <Input autoFocus />
            </Form.Item>
          )}
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
            <SelectSearch
              onSearch={onSearch}
              placeholder="المنتج - (الصلاحية)"
              style={{ minWidth: "300px" }}
            />
          </Form.Item>
        </Form>
      </Col>
      <Col span="24" className="isolate">
        <TrackingStocksTable />
        <div className="flex justify-center m-4">
          <Button disabled type="primary" icon={<SaveOutlined />}>
            حفظ
          </Button>
        </div>
      </Col>
    </Row>
  );
}
