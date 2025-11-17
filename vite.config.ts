import {defineConfig} from 'vite'
import {resolve} from 'path'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'


// https://vite.dev/config/
export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'src/public'),
    build: {
        outDir: '../dist',
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer
            ],
        }
    },
    plugins: [react()],
})
