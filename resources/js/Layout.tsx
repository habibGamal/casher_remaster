import React, {
    createContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import { Col, ConfigProvider, Row, message, theme } from "antd";
import Navbar from "./components/Navbar";
import { usePage } from "@inertiajs/inertia-react";
import Flash from "./interfaces/Flash";
import moment, { locale } from "moment";
import { configMomentLocaleAr } from "./config/dates";

type Theme = "dark" | "light";
export const themeToggler = createContext<{
    currentTheme: Theme;
    toggleTheme: (currentTheme: Theme) => void;
} | null>(null);

function Layout(props: { children: JSX.Element }) {
    const { flash } = usePage().props;
    const [currentTheme, setCurrentTheme] = useState<Theme>("light");
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
        const theme = themeFromStorage();
        updateHtmlElementTheme(theme);
    }, [currentTheme]);

    const themeFromStorage = () => {
        const theme = (localStorage.getItem("theme") ?? "light") as Theme;
        // set the current theme to the theme from storage
        if (theme !== currentTheme) setCurrentTheme(theme);
        return theme;
    };

    const updateHtmlElementTheme = (theme: Theme) => {
        const htmlElement = document.querySelector("html") as HTMLElement;
        const isDark = theme === "dark";
        if (isDark) htmlElement.classList.add("dark");
        else htmlElement.classList.remove("dark");
    };

    const toggleTheme = (currentTheme: Theme) => {
        localStorage.setItem("theme", currentTheme);
        setCurrentTheme(currentTheme);
    };

    useEffect(() => {
        configMomentLocaleAr();
        moment.locale('ar');
    }, []);

    return (
        <themeToggler.Provider value={{ currentTheme, toggleTheme }}>
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
