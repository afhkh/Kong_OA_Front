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
                }]

            }
        },
        getters:{

        },
        actions:{
           
        }
    }
)