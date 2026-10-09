import {createRouter,createWebHistory} from 'vue-router'
//createRouter用来创建路由器实例，createWebHistory函数，指定用HTML5 History模式，URL干净
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView2 from '../views/LoginView2.vue'
import LoginView from '../views/LoginView.vue'
const router= createRouter({
    history:createWebHistory(),//history用哪种方式记录URL
    routes:[
        {
            path:'/',
            component:HomeView
        },
        {
            path:'/about',
            component:AboutView
        },
        {
            path:'/login2',
            component:LoginView2
        },
        {
            path:'/login',
            component:LoginView
        }
    ]//路由表
}
)
export default router //导出路由器