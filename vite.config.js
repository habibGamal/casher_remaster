import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import vitePluginImport from 'vite-plugin-babel-import';
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/sass/index.scss', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
});
