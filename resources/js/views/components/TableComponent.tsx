import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import useTableSearch from '../../hooks/useTableSearch';
import createSearchFearure from '../../helpers/createTableSearchFeature';
import { DeleteOutlined ,EditOutlined} from '@ant-design/icons';
interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}



const TableComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>([
    {
      name: {
        first: 'محمد',
        last: 'عبد الرحمن'
      },
      gender: 'male',
      email: '',
      login: {
        uuid: '1'
      }
    }
  ]);
  const [loading, setLoading] = useState(false);
  const tableSearch = useTableSearch();
  const getColumnSearchProps = createSearchFearure<DataType>(tableSearch);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'أسم الصنف',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'سعر الشراء',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      width: '20%',
    },
    {
      title: 'كود الصنف',
      dataIndex: 'email',
    },
    {
      title: 'تحكم',
      render: () => (
        <Space>
          <Button type='primary'  icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </Space>
      )
    },
  ];
  const fetchData = () => {
    // setLoading(true);
    console.log('fetching data');

    // fetching data
    // fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     setData(results);
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: 200,
    //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<DataType> | SorterResult<DataType>[],) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      bordered
      onChange={handleTableChange}

    />
  );
};

export default TableComponent;