import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import vitePluginImport from 'vite-plugin-babel-import';
export default defineConfig({
    // build: {
    //     rollupOptions: {
    //         output: {
    //             manualChunks(id) {
    //                 if (id.includes('antd')) {
    //                     return 'antd';
    //                 }
    //             }
    //         }
    //     }
    // },
    // inlineDynamicImports: true,
    plugins: [
        laravel({
            input: ['resources/sass/index.scss', 'resources/js/app.tsx'],
            refresh: true,
        }),
        // vitePluginImport([
        //     {
        //         libraryName: 'antd',
        //         libraryDirectory: 'lib',
        //         style(name) {
        //             return `antd/lib/${name}/style/index.css`;
        //         },
        //     },
        // ]),

        react(),
    ],
});
