import { Col, Modal, Row, Space, message } from "antd";
import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import TableController from "../../components/TableController";
import useTableSearch from "../../hooks/useTableSearch";
import useModal from "../../hooks/useModal";
import StockForm from "../common/forms/StockForm";
import StocksTable from "../common/tables/StocksTable";
import DisplayModel from "../../components/DisplayModel";
import ModelContext from "../../interfaces/ModelContext";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";
import ModelConfig, { ModelColumns } from "../../interfaces/ModelConfig";
import StockServices from "../../services/stocks/StockServices";
import ModelGeneralServices from "../../services/ModelGeneralServices";

type ModelType = any;
const modelColumns: ModelColumns[] = [
    {
        title: "أسم المخزن",
        dataIndex: "name",
        key: "name",
        sorting: true,
    },
    {
        title: "المخزن يحتوي على بضائع",
        dataIndex: "selling_price",
        key: "selling_price",
    },
    {
        title: "تحكم",
        key: "control",
        renderWithCtx: (ctx: ModelContext<any>) => {
            return (record: ModelType) => (
                <Space size="middle">
                    <EditButton
                        onClick={() => {
                            ctx.setModelToEdit!(record);
                            ctx.modalForm?.showModal();
                        }}
                    />
                    <DeleteButton
                        onClick={() => {
                            ModelGeneralServices.delete(
                                record.id!,
                                StockServices.BASE_ROUTE
                            );
                        }}
                    />
                </Space>
            );
        },
    },
];

const config = {
    modelColumns,
    pageTitle: "أضافة الاصناف",
    search: {
        defaultValue: "name",
        options: [
            { label: "اسم المخزن", value: "name" },
        ],
    },
    exitSearchMode: (ctx: ModelContext<any>) => {
        ctx.search?.exitSearchMode();
        StockServices.index();
    },
    addButton: "أضافة صنف",
    slug: "stocks",
};
export default function Stocks() {
    const {
        search,
        setSearch,
        attribute,
        setAttribute,
        searchMode,
        enterSearchMode,
        exitSearchMode,
    } = useTableSearch("name");
    const {
        open,
        confirmLoading,
        showModal,
        handleOk,
        handleCancel,
        closeModal,
    } = useModal();

    return (
        <>
            {/* <Row gutter={[0, 25]} className="m-8">
                <PageTitle name="أضافة مخزن" /> */}
                {/* <Modal
                    title="أضافة مخزن"
                    open={open}
                    onOk={handleOk}
                    footer={null}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                    width="90%"
                >
                    <StockForm closeModal={closeModal} />
                </Modal> */}
                {/* <Col span="24" className="isolate">
                    <TableController
                        addButtonText="أضافة مخزن"
                        addButtonAction={showModal}
                        searchButtonAction={() => enterSearchMode()}
                        setSearch={setSearch}
                        setAttribute={setAttribute}
                        exitSearchMode={exitSearchMode}
                        defaultValue="name"
                        options={[
                            { label: "اسم المخزن", value: "name" },
                            { label: "اسم المسؤول", value: "employee_id" },
                        ]}
                    />
                    <StocksTable
                        searchMode={searchMode}
                        search={search}
                        attribute={attribute}
                    />
                </Col>
            </Row> */}
            <DisplayModel
                ModelForm={StockForm}
                config={config as ModelConfig}
            />
        </>
    );
}
