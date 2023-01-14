import {defineConfig} from 'vite';
import solidSvg from 'vite-plugin-solid-svg'
import solidPlugin from 'vite-plugin-solid';
import autoprefixer from "autoprefixer";

export default defineConfig({
    plugins: [solidPlugin(), solidSvg({defaultAsComponent: false, svgo: {enabled: false}})],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
    css: {
        postcss: {
            plugins: [autoprefixer()]
        }
    }
});
