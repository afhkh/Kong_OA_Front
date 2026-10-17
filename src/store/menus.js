import {defineStore} from 'pinia'
import $cookie from "vue-cookies"

export const definedMenus =defineStore(
    'definedMenus',//必须唯一
    {
        state:() =>{ //state中用于定义数据
            return{
                editableTabsValue:'Index',
                editableTabs:[{
                    title:'首页',
                    name:'Index',
                }],

                //1.从来没有发请求获取过动态路由,一开始就是false，加载过就是true
                hasRoutes:false,
                //2.一旦加载过，左侧菜单列表--》存储
                menuList:[],//字典套列表--》后端返回的nav对应的数据
                //3.按钮权限--》后端返回的authoritys对应的数据
                permList:[]

            }
        },
        getters:{

        },
        actions:{
           addTab(tab){
            let index=this.editableTabs.findIndex(e=>e.name===tab.name) //查找是否存在该标签，没找到返回-1，找到就返回对应下标
            if (index===-1){
                this.editableTabs.push({
                    title:tab.title,
                    name:tab.name
                });
            }
            this.editableTabsValue=tab.name
           },

           //4.我们正常使用pinia，我们不直接操作变量，而是通过方法去操作--》如果是获取{使用}变量，直接用即可
           setMenuList(menus){
                this.menuList=menus
           },
           setPermList(perms){
                this.permList=perms
           },
           changeRouteStatus(hasRoutes){
                this.hasRoutes=hasRoutes
           }
        }
    }
)