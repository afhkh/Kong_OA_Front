import {createRouter,createWebHistory} from 'vue-router'
import $cookie from 'vue-cookies'
//createRouter用来创建路由器实例，createWebHistory函数，指定用HTML5 History模式，URL干净
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/cankao/AboutView.vue'
// import LoginView2 from '../views/cankao/LoginView2.vue'
import LoginView from '../views/LoginView.vue'
import Index from '../views/admin/Index.vue'
// import Dept from '../views/admin/Dept.vue'
// import Info from '../views/admin/Info.vue'
// import Job from '../views/admin/Job.vue'
// import Menu from '../views/admin/Menu.vue'
// import Role from '../views/admin/Role.vue'
// import User from '../views/admin/User.vue'

import { reqAuth } from '../api/system.js'

import { definedMenus } from '../store/menus.js'
const router= createRouter({
    history:createWebHistory(),//history用哪种方式记录URL
    routes:[
        {
            path:'/',
            component:HomeView,
            children:[
                //首页一直带，无论任何用户登录，都能看到首页
                {
                    path:'index',
                    name:'Index',
                    component:Index
                },
                //下面的路由要动态生成--》通过后端动态路由接口--》接口返回什么，再加进去什么，所以下面注释掉
        //         {
        //             path:'info',
        //             name:'Info',
        //             component:Info
        //         },
        //         {
        //             path:'user',
        //             name:'User',
        //             component:User
        //         },
        //         {
        //             path:'role',
        //             name:'Role',
        //             component:Role
        //         },
        //         {
        //             path:'menu',
        //             name:'Menu',
        //             component:Menu
        //         },
        //         {
        //             path:'dept',
        //             name:'Dept',
        //             component:Dept
        //         },
        //         {
        //             path:'job',
        //             name:'Job',
        //             component:Job
        //         }
            ]
        },
        {
            path:'/login',
            component:LoginView
        }
    ]//路由表
}
)
/*
用户登录成功后--》点击任何一个菜单，都会触发router.beforeEach的执行
我们把 发送请求获取动态路径的代码，放在 路由守卫里
    -什么情况获取：没有加载过的情况
    -什么情况不获取：一旦加载过，不用每次都去获取，节省效率
        -有个字段标志：是否加载过---》这个字段放在pinia

 */

function menuToRoute(menu){
    //一个个把动态菜单，追加到router中
    if(!menu.component){
        return null
    }
    let route={
        name:menu.name,
        path:menu.path,
        meta:{
            icon:menu.icon,
            title:menu.title
        }
    }
    route.component=()=>import('../views/'+menu.component+'.vue')
    return route

}


async function reqMenuFunc(){
    let $store=definedMenus()
    //发送请求，获取动态路由的函数
    let res=await reqAuth() //reqAuth  是在api/system.js中
    //菜单列表套字典
    $store.setMenuList(res.nav)
    //按钮权限
    $store.setPermList(res.authoritys)
    let newRoutes=router.options.routes  //router.options.routes这个就是放路由的那个数组
    //***********动态绑定路由 **重点 ，后台返回几个，我们就追加到router几个
    res.nav.forEach(menu=>{
        /*每一个，长这样
        {
            'name': 'SysManga',
            'title': '系统管理',
            'icon': 'Sell',
            'component': '',
            'path': '',
            'children': [
                {
                    'name': 'SysInfo',
                    'title': '服务性能',
                    'icon': 'Sell',
                    'path': '/admin/info',
                    'component': 'admin/Info',
                    'children': []
                }
                。。。
            ]
        }
         */
        //还得判断，有没有children---->如果有，要循环children
        menu.children.forEach(e=>{
            /*每一个是这样
            {
                    'name': 'SysInfo',
                    'title': '服务性能',
                    'icon': 'Sell',
                    'path': '/admin/info',
                    'component': 'admin/Info',
                    'children': []
                }
             */
            //把他放到router中
            //生成一个route对象
            let route=menuToRoute(e)
            if(route){
                newRoutes[0].children.push(route)
            }
        })
    })
    //把所有的生成的路由对象，放到router中
    newRoutes.forEach((route)=>{
        router.addRoute(route)    //注册路由
    })
    //hasRoutes加载过了，变为true
    $store.changeRouteStatus(true)
}   


//控制除了登录页面，所有页面必须登录后才能看到

//路由守卫--》在进入到某个地址之前，先执行这个代码，判断用户是否有权限
//在这里面我们可以通过判断：cookie中，如果有token，说明是登录了，要访问那个页面，就能进哪个页面
//如果token为空，访问任何页面，都重定向到login
//to：去哪个路由对象，from:是从哪个路由对象过来，next是个函数，如果允许它跳转，直接执行next()

router.beforeEach(async (to,from,next)=>{
    let token=$cookie.get('token')
    //1.拿到pinia的menu的对象,这个初始化，不能放在外面--》如果放在外面--》如果放外面，在main.js中导入import router from "./routers";,代码会执行，而此时pinia还没有初始化

    let $store=definedMenus()
    //2.有没有发送请求获取动态路由,目前是false
    let hasRoute=$store.hasRoutes

    if(to.path=='/login'){//访问登录页面，直接去
        return next()
    }else if(!token){
        //重定向到login
        return next({path:'/login'})
    }else if(token && !hasRoute){//token有值：登录了，但是hasRoute是false，还没有加载过动态路由--》发送请求，获取动态路由
        try{
            await reqMenuFunc()
            //注册动态路由后，重新匹配刷新时访问的地址
            return next({...to,replace:true})
        }catch(error){
            return next({path:'/login'})
        }
    }
    next()
})


export default router //导出路由器
