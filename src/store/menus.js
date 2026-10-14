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
           addTab(tab){
            let index=this.editableTabs.findIndex(e=>e.name===tab.name) //查找是否存在该标签，没找到返回-1，找到就返回对应下标
            if (index===-1){
                this.editableTabs.push({
                    title:tab.title,
                    name:tab.name
                });
            }
            this.editableTabsValue=tab.name
           }
        }
    }
)