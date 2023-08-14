import React from "react";
import { Col, Form } from "antd";
import { FORM_COLUMNS_LAYOUT } from "../Config/layouts";

export default function formFieldsReshape(items: any[]) {
    const reshapedItems: any[][] = [];
    items.forEach((item) => {
        if (item.col) reshapedItems.push([]);
        else reshapedItems[reshapedItems.length - 1].push(item);
    });
    return reshapedItems.map((col) => (
        <Col {...FORM_COLUMNS_LAYOUT}>
            {col.map((item) => (
                <Form.Item
                    name={item.name}
                    label={item.label}
                    valuePropName={item.valuePropName}
                >
                    {item.component}
                </Form.Item>
            ))}
        </Col>
    ));
}
