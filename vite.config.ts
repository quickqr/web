import {defineConfig} from 'vite';
import solidSvg from 'vite-plugin-solid-svg'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin(), solidSvg({defaultAsComponent: false, svgo: {enabled: false}})],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
    },
});
