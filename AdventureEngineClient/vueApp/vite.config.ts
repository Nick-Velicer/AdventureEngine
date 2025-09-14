import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(), 
        tailwindcss()
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("../", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/theme/utilities.scss";`,
                silenceDeprecations: ['import']
            },
        },
    }
});
