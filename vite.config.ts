import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' 

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({ cache: false })
    ],
    resolve: {
        // Vite路径别名配置
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src')
            }
        ]
    }
})
