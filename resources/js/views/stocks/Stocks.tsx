import { Col, Modal, Row, message } from "antd";
import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import TableController from "../components/TableController";
import useTableSearch from "../../hooks/useTableSearch";
import useModal from "../../hooks/useModal";
import StockForm from "../common/forms/StockForm";
import StocksTable from "../common/tables/StocksTable";

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
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="أضافة مخزن" />
            <Modal
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
            </Modal>
            <Col span="24" className="isolate">
                <TableController
                    addButtonText="أضافة مخزن"
                    addButtonAction={showModal}
                    searchButtonAction={() => enterSearchMode()}
                    setSearch={setSearch}
                    setAttribute={setAttribute}
                    showSearchCancelButton={searchMode}
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
        </Row>
    );
}
