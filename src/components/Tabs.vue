<template>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab($event)">
        <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
        >

        </el-tab-pane>
  </el-tabs>
</template>
<script setup>
//点击某个tab页，会路由跳转---》代码控制路由跳转
import { userRouter } from 'vue-router';
let $router=userRouter() //后面跳转路由时用
//使用pinia存储，有多少tab页，以及当前哪个tab页时被点击的
import { definedMenus } from '../store/menus';
let $store=definedMenus()

//计算属性-->本质是一个方法--》可以当属性使用，当方法中使用的变量发生变化，这个方法会重新运算，得到新的值
import { computed } from 'vue';
//1.监控当前在哪个tab上
const editableTabs=computed({
    get(){
        return $store.editableTabs  //以后editableTabs发生变化，上面那个editableTabs也会跟着改变
    },
    set(val){
        $store.editableTabs=val
    }
})
//2.监控总共有多少个tab页
const editableTabsValues=computed({
    get(){},
    set(val){}
})
//3.关闭某个tab页的监控函数

//4.点击某个tab页的监控函数

</script>