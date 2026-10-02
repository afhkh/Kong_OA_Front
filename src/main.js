import { createApp } from 'vue'
import './assets/css/globel.css'
import App from './App.vue'
//注册路由
import router from './routers/index.js'

//注册pinia
import { createPinia } from 'pinia'
let pinia=createPinia()


createApp(App).use(router).use(pinia).mount('#app')
