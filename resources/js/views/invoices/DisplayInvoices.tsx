import { Row, Tabs, TabsProps } from "antd";
import React from "react";
import PageTitle from "../components/PageTitle";
import BuyingInvoices from "./buying_invoices/BuyingInvoices";
import BuyingInvoiceServices from "../../services/BuyingInvoiceServices";
import ReturnBuyingInvoices from "./return_buying_invoices/ReturnBuyingInvoices";
import ReturnBuyingInvoiceServices from "../../services/ReturnBuyingInvoiceServices";
const onChange = (key: string) => {
    if (key === "buying_invoices") {
        BuyingInvoiceServices.index();
    }
    if (key === "return_buying_invoices") {
        ReturnBuyingInvoiceServices.index();
    }
};

const items: TabsProps["items"] = [
    {
        key: "buying_invoices",
        label: `فواتير الشراء`,
        children: <BuyingInvoices />,
    },
    {
        key: "2",
        label: `فواتير البيع`,
        children: `Content of Tab Pane 2`,
    },
    {
        key: "return_buying_invoices",
        label: `مرتجع فواتير الشراء`,
        children: <ReturnBuyingInvoices />,
    },
    {
        key: "4",
        label: `مرتجع فواتير البيع`,
        children: `Content of Tab Pane 3`,
    },
];
export default function DisplayInvoices({ tab }: { tab: string }) {
    return (
        <Row gutter={[0, 25]} className="m-8">
            <PageTitle name={"الفواتير"} />
            <Tabs
                className="w-full"
                activeKey={tab}
                items={items}
                size="large"
                type="card"
                onChange={onChange}
            />
        </Row>
    );
}
