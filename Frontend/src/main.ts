import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/main.sass'
import 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

import IconComponent from '@/components/general/IconComponent.vue'
import WindowFrame from '@/components/windowframe/WindowFrame.vue'

const app = createApp(App)

app.component('IconComponent', IconComponent)
app.component('WindowFrame', WindowFrame)

app.use(createPinia())
app.use(router)

app.mount('#app')
