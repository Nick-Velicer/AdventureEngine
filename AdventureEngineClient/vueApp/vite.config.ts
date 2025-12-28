import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        //Unfortunately, there's some weirdness with the mkcert library
        //and Deno so we need to use a crt/key pair here for https
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("../", import.meta.url)),
        },
    },
    server: {
        //https: {
            //key: fs.readFileSync(path.resolve(__dirname, './certs/client.key')),
            //cert: fs.readFileSync(path.resolve(__dirname, './certs/client.crt')),
        //},
        host: 'localhost'
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
