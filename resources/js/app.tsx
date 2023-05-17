// import './bootstrap';
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from "./Layout";
import { ConfigProvider, theme } from "antd";
const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";


// const MainApp = ({ App, props }: any) => {
//     const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
//     return (
//         <themeToggler.Provider value={{ currentTheme, setCurrentTheme }}>
//             <ConfigProvider
//                 direction="rtl"
//                 theme={{
//                     algorithm:
//                         currentTheme === "light"
//                             ? theme.defaultAlgorithm
//                             : theme.darkAlgorithm,
//                     token: {
//                         colorPrimary:
//                             currentTheme === "light" ? "#7E57C2" : "9575CD",
//                         colorError: "#cf6679",
//                         fontSize: 18,
//                     },
//                 }}
//             >
//                 <App {...props} />
//             </ConfigProvider>
//         </themeToggler.Provider>
//     );
// };
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const res: any = await (resolvePageComponent(
            `./views/${name}.tsx`,
            import.meta.glob("./views/**/*.tsx")
        ) as any);
        const page = res.default;
        page.layout = (page: any) => <Layout children={page} />;
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

InertiaProgress.init({ color: "#4B5563", includeCSS: true, showSpinner: true });
