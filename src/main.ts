import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { VueFire, VueFireAuth } from 'vuefire'

import App from './App.vue'
import router from './router'

import './styles/main.sass'
import 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
