import {createRouter,createWebHistory} from 'vue-router'
import $cookie from 'vue-cookies'
//createRouter用来创建路由器实例，createWebHistory函数，指定用HTML5 History模式，URL干净
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/cankao/AboutView.vue'
import LoginView2 from '../views/cankao/LoginView2.vue'
import LoginView from '../views/LoginView.vue'
import Index from '../views/admin/Index.vue'
import Dept from '../views/admin/Dept.vue'
import Info from '../views/admin/Info.vue'
import Job from '../views/admin/Job.vue'
import Menu from '../views/admin/Menu.vue'
import Role from '../views/admin/Role.vue'
import User from '../views/admin/User.vue'
const router= createRouter({
    history:createWebHistory(),//history用哪种方式记录URL
    routes:[
        {
            path:'/',
            component:HomeView,
            children:[
                {
                    path:'index',
                    name:'Index',
                    component:Index
                },
                {
                    path:'info',
                    name:'Info',
                    component:Info
                },
                {
                    path:'user',
                    name:'User',
                    component:User
                },
                {
                    path:'role',
                    name:'Role',
                    component:Role
                },
                {
                    path:'menu',
                    name:'Menu',
                    component:Menu
                },
                {
                    path:'dept',
                    name:'Dept',
                    component:Dept
                },
                {
                    path:'job',
                    name:'Job',
                    component:Job
                }
            ]
        },
        {
            path:'/login',
            component:LoginView
        }
    ]//路由表
}
)

//控制除了登录页面，所有页面必须登录后才能看到

//路由守卫--》在进入到某个地址之前，先执行这个代码，判断用户是否有权限
//在这里面我们可以通过判断：cookie中，如果有token，说明是登录了，要访问那个页面，就能进哪个页面
//如果token为空，访问任何页面，都重定向到login
//to：去哪个路由对象，from:是从哪个路由对象过来，next是个函数，如果允许它跳转，直接执行next()

router.beforeEach((to,from,next)=>{
    let token=$cookie.get('token')
    if(to.path=='/login'){//访问登录页面，直接去
        next()
    }else if(!token){
        //重定向到login
        next({path:'/login'})
    }else{
        next()
    }
})


export default router //导出路由器