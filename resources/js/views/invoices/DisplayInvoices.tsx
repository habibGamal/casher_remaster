import { Row, Tabs, TabsProps } from "antd";
import React from "react";
import PageTitle from "../../components/PageTitle";
import BuyingInvoices from "./buying_invoices/Index";
import BuyInvServices from "../../services/invoices/BuyInvServices";
import ReturnBuyingInvoices from "./return_buying_invoices/Index";
import ReturnBuyInvServices from "../../services/invoices/ReturnBuyInvServices";
import SellingInvoices from "./selling_invoices/Index";
import SellInvServices from "../../services/invoices/SellInvServices";
const onChange = (key: string) => {
    switch (key) {
        case "buying_invoices":
            BuyInvServices.index();
            break;
        case "return_buying_invoices":
            ReturnBuyInvServices.index();
            break;
        case "selling_invoices":
            SellInvServices.index();
            break;
        default:
            break;
    }
};

const items: TabsProps["items"] = [
    {
        key: "buying_invoices",
        label: `فواتير الشراء`,
        children: <BuyingInvoices />,
    },
    {
        key: "selling_invoices",
        label: `فواتير البيع`,
        children: <SellingInvoices />,
    },
    {
        key: "return_buying_invoices",
        label: `مرتجع فواتير الشراء`,
        children: <ReturnBuyingInvoices />,
    },
    {
        key: "4",
        label: `مرتجع فواتير البيع`,
        children: "<SellingInvoices />",
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
