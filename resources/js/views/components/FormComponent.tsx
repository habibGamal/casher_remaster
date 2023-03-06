import { Checkbox, Radio, Select, Space, message } from 'antd';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
} from 'antd';
import React, { useState } from 'react';
import ButtonSax from './ButtonSax';
import Product from '../../app/models/Product';


const { Option } = Select;


const formItemLayout = {
  labelCol: {
    md: {
      span: 12
    },
    lg: {
      span: 24
    },
    xl: {
      span: 20
    }
  },
  wrapperCol: {
    md: {
      span: 12
    },
    lg: {
      span: 24
    },
    xl: {
      span: 20
    }
  },
};


const FormComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    const product = new Product({ productForm: values })
    const result = await product.create();
    if (result && result.rowsAffected > 0) {
      message.success('تم اضافة الصنف بنجاح')
      form.resetFields();
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ email: "habibmisi3@gmail.com" }}
      className='p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 '
      layout="vertical"
      scrollToFirstError
    >
      <Row gutter={24}>
        <Col md={24} lg={12} xl={8}>

          <Form.Item
            name="name"
            label="أسم الصنف"
            rules={[
              {
                required: true,
                message: 'هذا الحقل مطلوب',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="barcode"
            label="كود الصنف"
            rules={[
              { required: true, message: 'هذا الحقل مطلوب' },
              { pattern: new RegExp(/^[0-9]+$/), message: 'رقم الصنف يجب ان يكون ارقام فقط' },
            ]}

          >
            <Input />
          </Form.Item>

          <Form.Item name="product_group_id" initialValue={1} label="مجموعة الصنف" rules={[{ required: true, message: 'هذا الحقل مطلوب' }]}>
            <Select>
              <Option value={1}>غير مصنف</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={24} lg={12} xl={8}>

          <Form.Item
            name="buying_price"
            label="سعر الشراء"
            rules={[
              { pattern: new RegExp(/^[0-9]+$/), message: 'رقم الصنف يجب ان يكون ارقام فقط' },
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="selling_price"
            label="سعر البيع"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="minimum_stock"
            label="الحد الادنى من المخزون"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

        </Col>
        <Col md={24} lg={12} xl={8}>

          <Form.Item name="has_expire_date" initialValue={1} valuePropName="checked" >
            <Checkbox >يمتلك صلاحية</Checkbox>
          </Form.Item>

          <Form.Item initialValue={0} name="unit_or_weight">
            <Radio.Group>
              <Radio.Button value={0}>وحدة</Radio.Button>
              <Radio.Button value={1}>وزن</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="unit"
            label="اسم الوحدة"
            initialValue="قطعة"
            rules={[
              { required: true, message: 'هذا الحقل مطلوب' },
            ]}
          >
            {/* <Row>
              <Col span="18">
                <Input style={{ width: '100%' }} />
              </Col>

              <Col span="4" offset={2}>
                <ButtonSax icon="add" shape='circle' type='dashed' />
              </Col>
            </Row> */}
            <Input />
          </Form.Item>

        </Col>
      </Row>

      <Form.Item className='grid place-items-center mt-8'>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading} onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000)
          }}>
            حفظ
          </Button>
          <Button htmlType="button" onClick={() => { }}>
            اعادة ملئ المدخلات
          </Button>
        </Space>
      </Form.Item>

    </Form>
  );
};

export default FormComponent;