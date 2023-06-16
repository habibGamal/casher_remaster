import React, { useRef, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Badge, Button, MenuProps } from "antd";
import { Menu } from "antd";
import IconSax from "./IconSax";
import logo from "../../assets/images/logo.png";
import ProductServices from "../services/products/ProductServices";
import { Inertia } from "@inertiajs/inertia";
import ProductGroupServices from "../services/products/ProductGroupServices";
import StockServices from "../services/stocks/StockServices";
import OpeningStockServices from "../services/products/OpeningStockServices";
import BuyInvServices from "../services/invoices/BuyInvServices";
import TrackingStockServices from "../services/stocks/TrackingStocksServices";
import ReturnBuyInvServices from "../services/invoices/ReturnBuyInvServices";
import SellInvServices from "../services/invoices/SellInvServices";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

// make type that containes all the keys of the items manually
export type MenuKeys =
    | "add_products"
    | "product_groups"
    | "product_details"
    | "expired_products"
    | "openning_stock"
    | "add_stock"
    | "tracking_stocks"
    | "stock_waste"
    | "stock_transfer"
    | "supporters"
    | "invoices"
    | "accounting"
    | "repoting"
    | "managment"
    | "notifications"
    | "logout";

const items: MenuProps["items"] = [
    getItem("الاصناف", "products_section", <IconSax icon="shopping-bag" />, [
        getItem("اضافة الاصناف", "add_products"),
        getItem("مجموعات الاصناف", "product_groups"),
        getItem("تفاصيل الصنف", "product_details"),
        getItem("الاصناف منتهية الصلاحية", "expired_products"),
        getItem("الارصدة الافتتاحية", "openning_stock"),
    ]),

    getItem(
        "ادارة المخازن",
        "stock_section",
        <IconSax icon="stock" dir="custom" className="w-[24px]" />,
        [
            getItem("اضافة مخزن", "add_stock"),
            getItem("جرد المخازن", "tracking_stocks"),
            getItem("الهالك", "stock_waste"),
            getItem("التحويل بين المخازن", "stock_transfer"),
        ]
    ),
    getItem("الموردين والعملاء", "supporters", <IconSax icon="people" />, [
        getItem("Item 1", "g1"),
        getItem("Item 2", "g2"),
    ]),
    getItem("الفواتير", "invoices", <IconSax icon="receipt-item" />, [
        getItem("عرض الفواتير", "display_invoices"),
        getItem("فاتورة شراء", "create_buying_invoice"),
        getItem("فاتورة بيع", "create_selling_invoice"),
        getItem("مرتجع فاتورة شراء", "create_return_buying_invoice"),
        getItem("مرتجع فاتورة بيع", "create_return_selling_invoice"),
    ]),
    getItem("الحسابات", "accounting", <IconSax icon="calculator" />, [
        getItem("Item 1", "g1"),
        getItem("Item 2", "g2"),
    ]),
    getItem(
        "التقارير",
        "repoting",
        <IconSax icon="reports" dir="custom" className="w-[24px]" />,
        [getItem("Item 1", "g1"), getItem("Item 2", "g2")]
    ),
    getItem("الادارة", "managment ", <IconSax icon="key-square" />, [
        getItem("Item 1", "g1"),
    ]),
    { type: "divider" },
    getItem(
        "تنبيهات",
        "notifications",
        <Badge dot={true}>
            <IconSax icon="notification" className="text-red-400" />
        </Badge>
    ),
    getItem("الاعدادات", "settings", <IconSax icon="settings" />),
    getItem(
        "تسجيل خروج",
        "logout",
        <IconSax icon="login" className="text-red-400" />
    ),
];

const DEFALUT_SELECTED_KEY = ["products"];

const Navbar = () => {
    const onClick: MenuProps["onClick"] = (e) => {
        // inertia routing
        if (e.key === "add_products") ProductServices.index();
        if (e.key === "product_groups") ProductGroupServices.index();
        if (e.key === "add_stock") StockServices.index();
        if (e.key === "openning_stock") OpeningStockServices.index();
        if (e.key === "create_buying_invoice") BuyInvServices.create();
        if (e.key === "create_return_buying_invoice") ReturnBuyInvServices.create();
        if (e.key === "display_invoices") BuyInvServices.index();
        if (e.key === "settings") Inertia.get("/settings");
        if (e.key === "tracking_stocks") TrackingStockServices.index();
        if (e.key === "create_selling_invoice") SellInvServices.create();
    };
    const [collapsed, setCollapsed] = useState(false);
    const menu = useRef<HTMLDivElement>(null);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div
            ref={menu}
            className="min-h-screen border-l sticky top-0 border-[#e5e7eb] dark:border-dark-700 bg-white dark:bg-dark-900"
        >
            <div
                className="grid place-items-center cursor-pointer"
                onClick={() => Inertia.get("/")}
            >
                <div className="aspect-square my-16 w-[50px] rounded-full border-0 border-gray-300 grid place-items-center">
                    <img className="w-full object-contain" src={logo} />
                </div>
            </div>
            <Menu
                onClick={onClick}
                defaultSelectedKeys={DEFALUT_SELECTED_KEY}
                defaultOpenKeys={["products_section"]}
                mode="inline"
                items={items}
                style={{ borderInlineEnd: "none" }}
                inlineCollapsed={collapsed}
            />
            <Button
                type="primary"
                onClick={toggleCollapsed}
                className="absolute bottom-4 left-0 w-full rounded-none"
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
        </div>
    );
};

export default Navbar;
