import { InputRef } from "antd";
import { FilterConfirmProps } from "antd/es/table/interface";
import { useRef, useState } from "react";

export type useTableSearchReturn<T> = [
    string,
    string,
    React.Dispatch<React.SetStateAction<string>>,
    React.Dispatch<React.SetStateAction<string>>,
    ((selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: T) => void),
    ((clearFilters: () => void) => void),
    React.RefObject<InputRef>,
];

export default function useTableSearch<T>(): useTableSearchReturn<T> {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: T,) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex as string);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    return [searchText, searchedColumn, setSearchText, setSearchedColumn, handleSearch, handleReset, searchInput]
}