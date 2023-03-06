import { Checkbox, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useState } from "react";
import useFormError from "../../../hooks/useFormError";
import ProductService, {
    ProductFormSettings,
} from "../../../services/ProductService";
import { ProductWithProductGroup } from "../../../interfaces/Product";
import SelectSearch, { SetOptions } from "../../components/SelectSearch";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import useLoading from "../../../hooks/useLoading";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        md: {
            span: 12,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 20,
        },
    },
    wrapperCol: {
        md: {
            span: 12,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 20,
        },
    },
};
const columnsLayout = {
    md: 24,
    lg: 12,
    xl: 8,
};
type Model = ProductWithProductGroup;
interface FormProps {
    modelToEdit?: Model;
    closeModal: () => void;
}
const ProductForm = ({ modelToEdit, closeModal }: FormProps) => {
    const [form] = Form.useForm();

    const submitState = useLoading();

    const [unitOrWeight, setUnitOrWeight] = useState(0);

    const { setErrors, getError } = useFormError();

    const onFinish = (values: any) => {
        const productServices = new ProductService();
        productServices.setFormSettings(
            new ProductFormSettings(
                modelToEdit,
                form,
                values,
                submitState.stateLoading,
                closeModal,
                setErrors
            )
        );
        if (modelToEdit) productServices.update();
        else productServices.create();
    };

    const onSelectProductGroup = (value: string, setOptions: SetOptions) => {
        ProductService.selectSearchProductGroup(value, (page: any) => {
            if (!page.props.productGroups) return;
            const options = page.props.productGroups as {
                id: number;
                name: string;
            }[];
            setOptions(
                options.map((option) => ({
                    value: option.id.toString(),
                    label: option.name,
                }))
            );
        });
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="product_form"
            onFinish={onFinish}
            initialValues={modelToEdit}
            className="p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 "
            layout="vertical"
            scrollToFirstError
        >
            <Row gutter={24}>
                <Col {...columnsLayout}>
                    <Form.Item
                        name="name"
                        label="أسم الصنف"
                        {...getError("name")}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="barcode"
                        label="كود الصنف"
                        {...getError("barcode")}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="product_group_id"
                        label="مجموعة الصنف"
                        {...getError("product_group_id")}
                    >
                        <SelectSearch
                            onSearch={onSelectProductGroup}
                            placeholder="بحث"
                            defaultValue={
                                modelToEdit
                                    ? modelToEdit?.product_group?.name
                                    : undefined
                            }
                        />
                    </Form.Item>
                </Col>

                <Col {...columnsLayout}>
                    <Form.Item
                        name="buying_price"
                        label="سعر الشراء"
                        {...getError("buying_price")}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        name="selling_price"
                        label="سعر البيع"
                        {...getError("selling_price")}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="minimum_stock"
                        label="الحد الادنى من المخزون"
                        {...getError("minimum_stock")}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col {...columnsLayout}>
                    <Form.Item
                        name="has_expire_date"
                        initialValue={1}
                        valuePropName="checked"
                        {...getError("has_expire_date")}
                    >
                        <Checkbox>يمتلك صلاحية</Checkbox>
                    </Form.Item>

                    <Form.Item
                        initialValue={0}
                        name="unit_or_weight"
                        {...getError("unit_or_weight")}
                    >
                        <Radio.Group
                            onChange={(e) => setUnitOrWeight(e.target.value)}
                        >
                            <Radio.Button value={0}>وحدة</Radio.Button>
                            <Radio.Button value={1}>وزن</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="unit"
                        label="اسم الوحدة"
                        initialValue="قطعة"
                        {...getError("unit")}
                    >
                        <Input disabled={unitOrWeight === 1} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className="grid place-items-center mt-8">
                <Space>
                    <Button type="primary" htmlType="submit" loading={submitState.loading}>
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

export default ProductForm;
