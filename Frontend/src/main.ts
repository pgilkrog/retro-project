import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { globalCookiesConfig } from 'vue3-cookies'

import App from './App.vue'
import router from './router'

import './styles/main.sass'
import 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

import IconComponent from '@/components/general/IconComponent.vue'
import WindowFrame from '@/components/windowframe/WindowFrame.vue'

globalCookiesConfig({
  expireTimes: '30d',
  path: '',
  domain: '',
  secure: true,
  sameSite: "None"
})

const app = createApp(App)
const pinia = createPinia()

app.component('IconComponent', IconComponent)
app.component('WindowFrame', WindowFrame)

await app.use(pinia)
await app.use(router)

app.mount('#app')
