import { Col, Modal, Row, Space, message } from "antd";
import React, { useState } from "react";
import PageTitle from "../../Components/PageTitle";
import TableController from "../../Components/TableController";
import useTableSearch from "../../Hooks/useTableSearch";
import useModal from "../../Hooks/useModal";
import StockForm from "../common/forms/StockForm";
import DisplayModel from "../../Components/DisplayModel";
import ModelContext from "../../Interfaces/ModelContext";
import EditButton from "../../Components/EditButton";
import DeleteButton from "../../Components/DeleteButton";
import ModelConfig, { ModelColumns } from "../../Interfaces/ModelConfig";
import StockServices from "../../Services/Stocks/StockServices";
import ModelGeneralServices from "../../Services/ModelGeneralServices";

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
    pageTitle: "أضافة مخزن",
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
    addButton: "أضافة مخزن",
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
