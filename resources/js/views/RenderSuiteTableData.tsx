import { Col, Row, Space, Table, Tag } from "antd/es";
import { ColumnsType } from "antd/es/table";
import React from "react";
import PageTitle from "../Components/PageTitle";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? "geekblue" : "green";
                    if (tag === "loser") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"],
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"],
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sydney No. 1 Lake Park",
        tags: ["cool", "teacher"],
    },
];

export default function RenderSuiteTableData() {
    return (
        <Row gutter={[0, 25]} className="m-8">
            {/* <PageTitle name={config.pageTitle} />  */}
            {/* <model.FreeModal />
            <model.ModalForm /> */}
            <Col span="24" className="isolate">
                <Table
                    columns={columns}
                    // rowKey={(record) => record.id!}
                    dataSource={data}
                    // pagination={{
                    //     ...ctx.tableParams!.pagination,
                    //     total: ctx.paginatedData?.total,
                    // }}
                    // expandable={{
                    //     expandedRowRender: ctx.config.expandedRowRender,
                    //     rowExpandable: (record) =>
                    //         record.name !== "Not Expandable",
                    // }}
                    // loading={ctx.tableState!.loading}
                    // bordered
                    // onChange={ctx.handleTableChange}
                    // scroll={{ x: true }}
                    // footer={() =>
                    //     "عدد النتائج : " +
                    //     (ctx.paginatedData?.total === undefined
                    //         ? 0
                    //         : ctx.paginatedData?.total)
                    // }
                />
                {/* <model.ModelTable /> */}
            </Col>
        </Row>
    );
}
