// import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Layout from './Layout';
import { ConfigProvider } from 'antd';
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const res: any = await (resolvePageComponent(`./views/${name}.tsx`, import.meta.glob('./views/**/*.tsx')) as any)
        const page = res.default;
        page.layout = (page: any) => <Layout children={page} />
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ConfigProvider
                direction="rtl"
                theme={{
                    token: {
                        colorPrimary: "#47388d",
                        fontSize: 18,
                    },
                }}
            >
                <App {...props} />
            </ConfigProvider>
        );
    },
});

InertiaProgress.init({ color: '#4B5563', includeCSS: true, showSpinner: true, });
