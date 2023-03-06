import React, { useState } from "react";
import useTableController from "../../../hooks/useTableController";
import { Col, Row } from "antd";
import ProductsInGroupTable from "../../common/tables/ProductsInGroupTable";
import TableController from "../../components/TableController";
import { usePage } from "@inertiajs/inertia-react";

export default function ProductsInGroup() {
    const {
        search,
        setSearch,
        attribute,
        setAttribute,
        searchMode,
        enterSearchMode,
        exitSearchMode,
    } = useTableController("name");


    return (
        <Row gutter={[0, 25]} className="m-8">
            <Col span="24" className="isolate">
                <TableController
                    searchButtonAction={() => enterSearchMode()}
                    setSearch={setSearch}
                    setAttribute={setAttribute}
                    showSearchCancelButton={searchMode}
                    exitSearchMode={exitSearchMode}
                    defaultValue="name"
                    options={[
                        { label: 'اسم الصنف', value: 'name' },
                        { label: 'كود الصنف', value: 'barcode' },
                    ]}
                />
                <ProductsInGroupTable
                    searchMode={searchMode}
                    search={search}
                    attribute={attribute}
                />
            </Col>
        </Row>
    );
}
