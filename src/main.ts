import { createApp } from 'vue'
import router from '@/router'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/dynamicRoutesWithPermissions'

const app = createApp(App)
app.use(createPinia())
    .use(router)

app.mount('#app')
