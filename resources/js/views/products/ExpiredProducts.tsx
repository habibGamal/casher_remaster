import { Col, Modal, Row, message } from "antd";
import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import TableController from "../components/TableController";
import useTableController from "../../hooks/useTableController";
import ExpiredProductsTable from "../common/tables/ExpiredProductsTable";

export default function ExpiredProducts() {
  const {
    search,
    setSearch,
    attribute,
    setAttribute,
    searchMode,
    enterSearchMode,
    exitSearchMode,
  } = useTableController("name");
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <Row gutter={[0, 25]} className="m-8">
      <PageTitle name="الاصناف منتهية الصلاحية" />
      <Col span="24" className="isolate">
        <TableController
          searchButtonAction={() => enterSearchMode()}
          setSearch={setSearch}
          setAttribute={setAttribute}
          showSearchCancelButton={searchMode}
          exitSearchMode={exitSearchMode}
          defaultValue="name"
          options={[
            { label: "اسم الصنف", value: "name" },
            { label: "الكود", value: "barcode" },
            { label: "اسم المخزن", value: "stock_id" },
          ]}
        />
        <ExpiredProductsTable
          searchMode={searchMode}
          search={search}
          attribute={attribute}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Col>
    </Row>
  );
}
