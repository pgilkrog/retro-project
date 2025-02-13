import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { globalCookiesConfig } from 'vue3-cookies'

import App from './App.vue'
import router from './router'

import './main.sass'
import 'bootstrap-icons/font/bootstrap-icons.css'

globalCookiesConfig({
  expireTimes: '30d',
  path: '',
  domain: '',
  secure: true,
  sameSite: 'None',
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)
const pinia = createPinia()

app.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info)
}

app.use(pinia)
app.use(router)

app.mount('#app')
