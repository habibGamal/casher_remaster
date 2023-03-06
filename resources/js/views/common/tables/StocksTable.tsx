import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Product from "../../../app/models/Product";
import useModal from "../../../hooks/useModal";
import ProductForm from "../forms/ProductForm";
import useSortTable from "../../../hooks/useSortTable";
import ProductService from "../../../app/services/ProductService";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";
import { QueryResult } from "tauri-plugin-sql-api";
import OpeningStockForm from "../forms/OpeningStockForm";
import StockForm from "../forms/StockForm";

interface StocksTableProps {
  searchMode: boolean;
  search: string;
  attribute: string;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const StocksTable = ({
  searchMode,
  search,
  attribute,
  refresh,
  setRefresh,
}: StocksTableProps) => {
  const [loading, setLoading] = useState(false);
  const { tableParams, handleTableChange, resetPagination } =
    useTablePagination<Product>();
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const {
    open,
    closeModal,
    confirmLoading,
    showModal,
    handleOk,
    handleCancel,
  } = useModal();
  const { getSortProps, sortDB, sortedInfo } = useSortTable<Product>();

  const editModel = (product: Product) => {
    setProductToEdit(product);
    showModal();
  };

  const columns: ColumnsType<Product> = [
    {
      title: "أسم المخزن",
      dataIndex: "name",
      key: "name",
      ...getSortProps("name"),
    },
    {
      title: "المسؤول",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "المخزن يحتوي على بضائع",
      dataIndex: "selling_price",
      key: "selling_price",
    },
    {
      title: "تحكم",
      key: "control",
      render: (record: Product) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => editModel(record)}
            icon={<EditOutlined />}
          />
          <Button
            danger
            onClick={() => handleDelete(record)}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const fetchData = async (search?: string) => {
    setLoading(true);
    const { products, count } = await ProductService.chunk(
      tableParams,
      sortDB(),
      search
    );
    setData(products);
    setTotal(count);
    setLoading(false);
  };

  const handleDelete = async (product: Product) => {
    const res = (await product.delete()) as QueryResult;
    if (res && res.rowsAffected === 1) {
      setRefresh(!refresh);
      message.info("تم حذف الصنف بنجاح");
    } else {
      message.error("حدث خطأ أثناء حذف الصنف");
    }
  };

  useEffect(() => {
    searchMode ? fetchData(`${attribute} LIKE '%${search}%'`) : fetchData();
  }, [JSON.stringify(tableParams), searchMode, attribute, sortedInfo, refresh]);

  useWhileTyping(
    () => {
      resetPagination();
      fetchData(`${attribute} LIKE '%${search}%'`);
    },
    searchMode,
    [searchMode, search]
  );

  return (
    <>
      <Modal
        title="تعديل بيانات المخزن"
        open={open}
        onOk={handleOk}
        footer={null}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={true}
        width="90%"
      >
        <StockForm
          closeModal={closeModal}
          modelToEdit={productToEdit || undefined}
        />
      </Modal>
      <Table
        columns={columns}
        rowKey={(record) => record.id!}
        dataSource={data}
        pagination={{ ...tableParams.pagination, total }}
        loading={loading}
        bordered
        onChange={handleTableChange}
        footer={() => "عدد النتائج : " + total}
      />
    </>
  );
};

export default StocksTable;
