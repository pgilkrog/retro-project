import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { VueFire, VueFireAuth } from 'vuefire'

import App from './App.vue'
import router from './router'

import './styles/main.sass'
import 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

import IconComponent from '@/components/general/IconComponent.vue'

const app = createApp(App)

app.component('IconComponent', IconComponent)
app.use(createPinia())
app.use(router)

app.mount('#app')
