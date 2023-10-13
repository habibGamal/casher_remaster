import React, { useRef, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Badge, Button, MenuProps } from "antd";
import { Menu } from "antd";
import IconSax from "./IconSax";
import logo from "../../assets/images/logo.png";
import ProductServices from "../Services/Products/ProductServices";
import { router } from "@inertiajs/react";
import ProductGroupServices from "../Services/Products/ProductGroupServices";
import StockServices from "../Services/Stocks/StockServices";
import OpeningStockServices from "../Services/Products/OpeningStockServices";
import BuyInvServices from "../Services/Invoices/BuyInvServices";
import TrackingStockServices from "../Services/Stocks/TrackingStocksServices";
import ReturnBuyInvServices from "../Services/Invoices/ReturnBuyInvServices";
import SellInvServices from "../Services/Invoices/SellInvServices";
import ReturnSellInvServices from "../Services/Invoices/ReturnSellInvServices";
import { Link } from "@inertiajs/react";
import TransferBetweenStocksServices from "../Services/Stocks/TransferBetweenStocksServices";

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
        getItem(<Link href="/products"> الاصناف </Link>, "products"),
        getItem(
            <Link href="/product-groups">مجموعات الاصناف</Link>,
            "product_groups"
        ),
        getItem(
            <Link href="/product-details"> تفاصيل الصنف </Link>,
            "product_details"
        ),
        getItem(
            <Link href="/"> الاصناف منتهية الصلاحية </Link>,
            "expired_products"
        ),
        getItem(
            <Link href={OpeningStockServices.BASE_ROUTE + "/create"}>
                الارصدة الافتتاحية
            </Link>,
            "openning_stock"
        ),
    ]),

    getItem(
        "ادارة المخازن",
        "stock_section",
        <IconSax icon="stock" dir="custom" className="w-[24px]" />,
        [
            getItem(
                <Link href="/stocks">اضافة مخزن</Link>,
                "add_stock"
            ),
            getItem(
                <Link href={TrackingStockServices.BASE_ROUTE}>
                    جرد المخازن
                </Link>,
                "tracking_stocks"
            ),
            getItem(<Link href="/"> الهالك </Link>, "stock_waste"),
            getItem(
                <Link href={TransferBetweenStocksServices.BASE_ROUTE}>
                    التحويل بين المخازن
                </Link>,
                "transfer_between_stocks"
            ),
        ]
    ),
    // getItem("الموردين والعملاء", "supporters", <IconSax icon="people" />, [
    //     getItem("Item 1", "g1"),
    //     getItem("Item 2", "g2"),
    // ]),
    getItem("الفواتير", "invoices", <IconSax icon="receipt-item" />, [
        getItem(
            <Link href={BuyInvServices.BASE_ROUTE}>عرض الفواتير</Link>,
            "display_invoices"
        ),
        getItem(
            <Link href={BuyInvServices.BASE_ROUTE + "/create"}>
                فاتورة شراء
            </Link>,
            "create_buying_invoice"
        ),
        getItem(
            <Link href={SellInvServices.BASE_ROUTE + "/create"}>
                فاتورة بيع
            </Link>,
            "create_selling_invoice"
        ),
        getItem(
            <Link href={ReturnBuyInvServices.BASE_ROUTE + "/create"}>
                مرتجع فاتورة شراء
            </Link>,
            "create_return_buying_invoice"
        ),
        getItem(
            <Link href={ReturnSellInvServices.BASE_ROUTE + "/create"}>
                مرتجع فاتورة بيع
            </Link>,
            "create_return_selling_invoice"
        ),
    ]),
    // getItem("الحسابات", "accounting", <IconSax icon="calculator" />, [
    //     getItem("Item 1", "g1"),
    //     getItem("Item 2", "g2"),
    // ]),
    getItem(
        "التقارير",
        "repoting",
        <IconSax icon="reports" dir="custom" className="w-[24px]" />,
        [
            getItem(
                <Link href={"/reports/sales"}>تقارير المبيعات</Link>,

                "sales_reports"
            ),
            getItem("Item 2", "g2"),
        ]
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
        <Link method="post" href={"/logout"}>
            تسجيل خروج
        </Link>,

        "logout",
        <IconSax icon="login" className="text-red-400" />
    ),
];

const DEFALUT_SELECTED_KEY = ["products"];

const Navbar = () => {
    const onClick: MenuProps["onClick"] = (e) => {
        // inertia routing
        // if (e.key === "add_products") ProductServices.index();
        // if (e.key === "product_groups") ProductGroupServices.index();
        // if (e.key === "add_stock") StockServices.index();
        // if (e.key === "openning_stock") OpeningStockServices.index();
        // if (e.key === "create_buying_invoice") BuyInvServices.create();
        // if (e.key === "create_return_buying_invoice") ReturnBuyInvServices.create();
        // if (e.key === "create_selling_invoice") SellInvServices.create();
        // if (e.key === "create_return_selling_invoice") ReturnSellInvServices.create();
        // if (e.key === "display_invoices") BuyInvServices.index();
        if (e.key === "settings") router.get("/settings");
        // if (e.key === "tracking_stocks") TrackingStockServices.index();
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
                onClick={() => router.get("/")}
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
