import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { globalCookiesConfig } from 'vue3-cookies'

import App from './App.vue'
import router from './router'

import './styles/main.sass'
import 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

import IconComponent from '@/components/utils/IconComponent.vue'
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import ButtonComponent from '@/components/utils/ButtonComponent.vue'
import InputComponent from '@/components/utils/InputComponent.vue'

globalCookiesConfig({
  expireTimes: '30d',
  path: '',
  domain: '',
  secure: true,
  sameSite: "None"
})

const app = createApp(App)
const pinia = createPinia()

app.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info)
}

app.component('IconComponent', IconComponent)
app.component('WindowFrame', WindowFrame)
app.component('Btn', ButtonComponent)
app.component('BaseInput', InputComponent)

app.use(pinia)
app.use(router)

app.mount('#app')
