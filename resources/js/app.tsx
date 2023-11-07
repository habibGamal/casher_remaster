// import './bootstrap';
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import AuthorizedLayout from "./Layouts/AuthorizedLayout";
const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const res: any = await (resolvePageComponent(
            `./views/${name}.tsx`,
            import.meta.glob("./views/**/*.tsx")
        ) as any);
        const page = res.default;
        const defaultLayout = page.layout;
        page.layout =
            defaultLayout ||
            ((page: any) => <AuthorizedLayout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

