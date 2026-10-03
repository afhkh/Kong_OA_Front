import { createApp } from 'vue'
import './assets/css/globel.css'
import App from './App.vue'
//注册路由
import router from './routers/index.js'

//注册pinia
import { createPinia } from 'pinia'
let pinia=createPinia()


//使用elementui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
