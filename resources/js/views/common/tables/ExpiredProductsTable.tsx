import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import Product from "../../../app/models/Product";
import useSortTable from "../../../hooks/useSortTable";
import ProductService from "../../../app/services/ProductService";
import useTablePagination from "../../../hooks/useTablePagination";
import useWhileTyping from "../../../hooks/useWhileTyping";

interface ExpiredProductsTableProps {
  searchMode: boolean;
  search: string;
  attribute: string;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const ExpiredProductsTable = ({
  searchMode,
  search,
  attribute,
  refresh,
  setRefresh,
}: ExpiredProductsTableProps) => {
  const [loading, setLoading] = useState(false);
  const { tableParams, handleTableChange, resetPagination } =
    useTablePagination<Product>();
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { getSortProps, sortDB, sortedInfo } = useSortTable<Product>();

  const columns: ColumnsType<Product> = [
    {
      title: "أسم الصنف",
      dataIndex: "name",
      key: "name",
      ...getSortProps("name"),
    },
    {
      title: "كود الصنف",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "الكمية المنتهية الصلاجية",
      dataIndex: "buying_price",
      key: "buying_price",
      ...getSortProps("buying_price"),
    },
    {
      title: "المخزن",
      dataIndex: "selling_price",
      key: "selling_price",
    },
    {
      title: "تاريخ الصلاحية",
      dataIndex: "minimum_stock",
      key: "minimum_stock",
    },

    {
      title: "تحكم",
      key: "control",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" icon={<SyncOutlined />}>
            ارجاع الى المورد
          </Button>

          <Button danger icon={<DeleteOutlined />}>
            اهلاك الكمية
          </Button>
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

export default ExpiredProductsTable;
