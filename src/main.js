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

//图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app=createApp(App)
for(const[key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

app.use(pinia).use(router).use(ElementPlus).mount('#app')
