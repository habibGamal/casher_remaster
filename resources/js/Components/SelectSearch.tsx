import { Select } from "antd";
import React, { useState } from "react";
export type SetOptions = React.Dispatch<
    React.SetStateAction<
        {
            value: string;
            label: string;
        }[]
    >
>;
interface SelectSearchProps {
    name?: string;
    onChange?: (value: string) => void;
    placeholder?: React.ReactNode;
    onSearch: (value: string, setOptions: SetOptions) => void;
    style?: React.CSSProperties;
    defaultValue?: string | null | undefined;
    disabled?: boolean;
}

export default function SelectSearch({
    name,
    onChange,
    onSearch,
    placeholder,
    style,
    defaultValue,
    disabled,
}: SelectSearchProps) {
    const [options, setOptions] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    return (
        <Select
            id={name}
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={(value) => onSearch(value, setOptions)}
            filterOption={(input, option) =>
                (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
            }
            options={options}
            style={style}
            defaultValue={defaultValue}
            disabled={disabled}
        />
    );
}
