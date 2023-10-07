import React from "react";
import {
    Input,
    InputNumber,
    Checkbox,
    Radio,
    Select,
    Form,
    FormInstance,
} from "antd";
import SelectSearch from "../Components/SelectSearch";
import SelectSearchUtils from "../Services/SelectSearchUtils";
import selectSearchSlug from "./selectSearchSlug";
export type FormSchema = {
    [key: string]: FormSchemaField | boolean;
};

export type FormSchemaField = {
    type: string;
    label: [string, string];
    placeholder?: [string, string];
    options?: { [key: string]: [string, string] };
    min?: number;
    disabled?: { [key: string]: string };
    slug?: string;
};

export default function fromGenerator(
    formSchema: FormSchema,
    form: FormInstance
) {
    return Object.entries(formSchema).map(([name, field]) => {
        if (name.includes("col")) return { col: true };
        return new InputConstruction(
            name,
            field as FormSchemaField,
            form
        ).build();
    });
}
class InputConstruction {
    constructor(
        private name: string,
        private field: FormSchemaField,
        private form: FormInstance,
        private lang = 1
    ) {
        this.text = this.text.bind(this);
        this.number = this.number.bind(this);
        this.select = this.select.bind(this);
        this.radio = this.radio.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.component = this.component.bind(this);
        this.selectSearch = this.selectSearch.bind(this);
    }

    build() {
        const deps = this.dependencies();
        if (!deps)
            return (
                <Form.Item
                    key={this.name}
                    name={this.name}
                    label={this.field.label[this.lang]}
                    valuePropName={
                        this.field.type === "checkbox" ? "checked" : undefined
                    }
                >
                    <this.component />
                </Form.Item>
            );
        return (
            <Form.Item dependencies={this.dependencies()}>
                {() => (
                    <Form.Item
                        key={this.name}
                        name={this.name}
                        label={this.field.label[this.lang]}
                        valuePropName={
                            this.field.type === "checkbox"
                                ? "checked"
                                : undefined
                        }
                    >
                        <this.component />
                    </Form.Item>
                )}
            </Form.Item>
        );
    }

    private getDisableDeps(): [string | undefined, string | undefined] {
        return Object.entries(this.field.disabled ?? {})[0] ?? [];
    }

    private dependencies() {
        const [fieldName] = this.getDisableDeps();
        return fieldName ? [fieldName] : undefined;
    }

    private component(props?: any) {
        if (this.field.type === "text") return <this.text {...props} />;
        if (this.field.type === "number") return <this.number {...props} />;
        if (this.field.type === "checkbox") return <this.checkbox {...props} />;
        if (this.field.type === "radio") return <this.radio {...props} />;
        if (this.field.type === "select") return <this.select {...props} />;
        if (this.field.type === "select_search")
            return <this.selectSearch {...props} />;
        return <></>;
    }

    private isDisabled() {
        const [fieldName, fieldValue] = this.getDisableDeps();
        const disabled = fieldName
            ? this.form.getFieldValue(fieldName) === fieldValue
            : false;
        return disabled;
    }

    private options() {
        return this.field.options
            ? Object.entries(this.field.options).map(([key, value]) => ({
                  label: value[this.lang],
                  value: key,
              }))
            : [];
    }

    private text(props?: any) {
        return (
            <Input
                {...props}
                disabled={this.isDisabled()}
                placeholder={this.field.placeholder?.[this.lang]}
            />
        );
    }

    private number(props?: any) {
        return (
            <InputNumber
                {...props}
                disabled={this.isDisabled()}
                placeholder={this.field.placeholder?.[this.lang]}
                min={this.field.min}
                style={{ width: "100%" }}
            />
        );
    }

    private select(props?: any) {
        return (
            <Select
                {...props}
                disabled={this.isDisabled()}
                placeholder={this.field.placeholder?.[this.lang]}
            >
                {this.options().map(({ label, value }) => (
                    <Select.Option key={value} value={value}>
                        {label}
                    </Select.Option>
                ))}
            </Select>
        );
    }

    private radio(props?: any) {
        return (
            <Radio.Group {...props} disabled={this.isDisabled()}>
                {this.options().map(({ label, value }) => (
                    <Radio key={value} value={value}>
                        {label}
                    </Radio>
                ))}
            </Radio.Group>
        );
    }

    private checkbox(props?: any) {
        return <Checkbox disabled={this.isDisabled()} {...props} />;
    }

    private selectSearch(props?: any) {
        return (
            <SelectSearch
                id={this.name}
                onSearch={selectSearchSlug(this.field.slug ?? "")}
                placeholder={this.field.placeholder?.[this.lang]}
                {...props}
                // defaultValue={
                //     modelToEdit ? modelToEdit?.product_group?.name : undefined
                // }
            />
        );
    }
}
