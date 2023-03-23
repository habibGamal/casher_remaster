import { Checkbox, Radio, Select, Space, message } from "antd";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import React, { useState } from "react";
import useFormError from "../../../hooks/useFormError";
import ProductServices from "../../../services/ProductServices";
import { ProductWithProductGroup } from "../../../interfaces/Product";
import SelectSearch, { SetOptions } from "../../components/SelectSearch";
import useLoading from "../../../hooks/useLoading";
import { FORM_COLUMNS_LAYOUT, FORM_LAYOUT_1 } from "../../../Layouts";
import ModelServices from "../../../services/ModelServices";

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
        const services = ModelServices.setFormGlobalSettings({
            modelId: modelToEdit?.id,
            form,
            formValues: values,
            stateLoading: submitState.stateLoading,
            closeFormModal: closeModal,
            setErrors,
        });
        if (modelToEdit) services.update(ProductServices.BASE_ROUTE);
        else services.create(ProductServices.BASE_ROUTE);
    };

    const onSelectProductGroup = (value: string, setOptions: SetOptions) => {
        ProductServices.selectSearchProductGroup(value, (page: any) => {
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
            {...FORM_LAYOUT_1}
            form={form}
            name="product_form"
            onFinish={onFinish}
            initialValues={modelToEdit}
            className="p-8 border-2 border-indigo-500 rounded-md bg-indigo-50 "
            layout="vertical"
            scrollToFirstError
        >
            <Row gutter={24}>
                <Col {...FORM_COLUMNS_LAYOUT}>
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

                <Col {...FORM_COLUMNS_LAYOUT}>
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
                <Col {...FORM_COLUMNS_LAYOUT}>
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

export default ProductForm;
