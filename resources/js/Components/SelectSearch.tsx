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
    id?: string;
    onChange?: (value: string) => void;
    placeholder?: React.ReactNode;
    onSearch: (value: string, setOptions: SetOptions) => void;
    style?: React.CSSProperties;
    defaultValue?: string | null | undefined;
    disabled?: boolean;
}

export default function SelectSearch({
    id,
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
    console.log(options);
    return (
        <Select
            id={id}
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={(value) =>
                value.length > 1 ? onSearch(value, setOptions) : null
            }
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
