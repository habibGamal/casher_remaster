import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { Col, ConfigProvider, Row, message, theme } from "antd";
import Navbar from "./views/components/Navbar";
import { usePage } from "@inertiajs/inertia-react";
interface Flash {
    error?: string;
    success?: string;
}
export const themeToggler = createContext<{
    currentTheme: "light" | "dark";
    setCurrentTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
} | null>(null);
function Layout(props: { children: JSX.Element }) {
    const { flash } = usePage().props;
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
    // check if flash has error or success message display it
    useEffect(() => {
        const { error, success } = flash as Flash;
        if (error) {
            message.error(error);
        }
        if (success) {
            message.success(success);
        }
    }, [flash]);

    // switch to dark theme by add `dark` class to html tag
    // to trigger dark mode in tailwindcss
    useLayoutEffect(() => {
        const html = document.querySelector("html") as HTMLElement;
        if (currentTheme === "dark") html.classList.add("dark");
        else html.classList.remove("dark");
    }, [currentTheme]);

    return (
        <themeToggler.Provider value={{ currentTheme, setCurrentTheme }}>
            <ConfigProvider
                direction="rtl"
                theme={{
                    algorithm:
                        currentTheme === "light"
                            ? theme.defaultAlgorithm
                            : theme.darkAlgorithm,
                    token: {
                        colorPrimary:
                            currentTheme === "light" ? "#7E57C2" : "9575CD",
                        colorError: "#cf6679",
                        fontSize: 18,
                        fontFamily: "tajawal",
                    },
                }}
            >
                <Row wrap={false}>
                    <Col>
                        <Navbar />
                    </Col>
                    <Col flex="auto">{props.children}</Col>
                </Row>
            </ConfigProvider>
        </themeToggler.Provider>
    );
}

export default Layout;
