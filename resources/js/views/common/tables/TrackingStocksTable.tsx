import React, { useState } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import EditableRow from "../../components/EditableRow";
import EditableCell from "../../components/EditableCell";
import useEditableTable from "../../../hooks/useEditableTable";

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;
type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

const TrackingStocksTable: React.FC = () => {
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "المنتج",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "الكمية الحالية",
      dataIndex: "age",
    },
    {
      title: "الكمية الجديدة",
      dataIndex: "address",
      editable: true,
      width: "30%",
    },
    {
      title: "تحكم",
      dataIndex: "operation",
      render: (_, record: any) =>
        dataSource.length >= 1 ? (
          <Button
            danger
            onClick={() => handleDelete(record.key)}
            icon={<DeleteOutlined />}
          />
        ) : null,
    },
  ];
  const { dataSource, handleDelete, handleAdd, handleSave } =
    useEditableTable<DataType>();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const save = () => {};

  return (
    <div>
      {/* <Button onClick={()=>handleAdd({
        key: "0",
        name: "منتج جديد",
        age: "0",
        address: "0",
      })} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default TrackingStocksTable;
