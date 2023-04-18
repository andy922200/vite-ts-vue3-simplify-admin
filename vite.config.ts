import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import eslintPlugin from 'vite-plugin-eslint' 
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default ({ mode }: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd())
    const currentEnvName = env.VITE_APP_ENV_NAME || 'default'
    console.log('currentEnvName', currentEnvName)

    return {
        server: {
            port: 3000
        },
        plugins: [
            vue(),
            VueI18nPlugin({
                /* options */
                // locale messages resource pre-compile option
                // eslint-disable-next-line no-undef
                include: resolve(dirname(fileURLToPath(import.meta.url)), './lang/**'),
            }),
            eslintPlugin({ cache: false }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/variables.scss" as *;',
                    javascriptEnabled: true
                }
            }
        },
        resolve: {
            // Vite路径别名配置
            alias: [
                {
                    find: 'vue-i18n',
                    replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
                },
                {
                    find: '@',
                    replacement: resolve(__dirname, 'src')
                }
            ]
        }
    }
}

// https://vitejs.dev/config/
// export default defineConfig()
