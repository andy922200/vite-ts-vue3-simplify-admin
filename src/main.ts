import { createApp } from 'vue'
import router from '@/router'
import pinia from '@/store/pinia'
import i18n from '@/lang/index'
import App from './App.vue'
import '@/dynamicRoutesWithPermissions'

// integrate with svg icons
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(pinia)
    .use(router)
    .use(i18n)

app.mount('#app')
