import { Row, Tabs, TabsProps } from "antd";
import React from "react";
import PageTitle from "../../Components/PageTitle";
import BuyingInvoices from "./BuyingInvoices/Index";
import SellingInvoices from "./SellingInvoices/Index";
import ReturnBuyingInvoices from "./ReturnBuyingInvoices/Index";
import ReturnSellingInvoices from "./ReturnSellingInvoices/Index";
import BuyInvServices from "../../Services/Invoices/BuyInvServices";
import SellInvServices from "../../Services/Invoices/SellInvServices";
import ReturnBuyInvServices from "../../Services/Invoices/ReturnBuyInvServices";
import ReturnSellInvServices from "../../Services/Invoices/ReturnSellInvServices";
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
        case "return_selling_invoices":
            ReturnSellInvServices.index();
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
        key: "return_selling_invoices",
        label: `مرتجع فواتير البيع`,
        children: <ReturnSellingInvoices />,
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
