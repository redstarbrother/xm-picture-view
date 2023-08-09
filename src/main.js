import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { socket } from '@/components/socket'

const app = createApp(App)

// 连接ws服务器并挂载socket对象到app
socket.connect()
app.config.globalProperties.$socket = socket

app.use(createPinia())
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
