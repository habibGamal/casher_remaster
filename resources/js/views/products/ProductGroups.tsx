import { Col, Modal, Row, message } from "antd";
import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import TableController from "../components/TableController";
import useTableController from "../../hooks/useTableController";
import useModal from "../../hooks/useModal";
import ProductGroupForm from "../common/forms/ProductGroupForm";
import ProductGroupsTable from "../common/tables/ProductGroupsTable";
import ProductGroupServices from "../../services/ProductGroupServices";

export default function ProductGroups() {
    const {
        search,
        setSearch,
        attribute,
        setAttribute,
        searchMode,
        enterSearchMode,
        exitSearchMode,
    } = useTableController("name");
    const {
        open,
        confirmLoading,
        showModal,
        handleOk,
        handleCancel,
        closeModal,
    } = useModal();

    const exitSearchModeAndGoIndex = () => {
        exitSearchMode();
        ProductGroupServices.index();
    };
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name="مجموعات الاصناف" />
            <Modal
                title="اضافة مجموعة"
                open={open}
                onOk={handleOk}
                footer={null}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
                width="90%"
            >
                <ProductGroupForm closeModal={closeModal} />
            </Modal>
            <Col span="24" className="isolate">
                <TableController
                    addButtonText="اضافة مجموعة"
                    addButtonAction={showModal}
                    searchButtonAction={() => enterSearchMode()}
                    setSearch={setSearch}
                    setAttribute={setAttribute}
                    showSearchCancelButton={searchMode}
                    exitSearchMode={exitSearchModeAndGoIndex}
                />
                <ProductGroupsTable
                    searchMode={searchMode}
                    search={search}
                    attribute={attribute}
                />
            </Col>
        </Row>
    );
}
