<template>


</template>
<script>
import { reqServerData } from '../api/home';
//定时，每隔5秒，向后端发送一次请求--》动态变的--》websocket会更有优势
//1.导入依赖--安装echars  --》 npm install echarts --save
import {ref,onMounted,onBeforeUnmount} from 'vue';
import { reqServerData } from '../api/home';
import * as echarts from 'echarts'
const systemInfo=ref({})
let pollInterval=null

//2.写一个async的函数
async function getServerData(){
    let res=await reqServerData()
    systemInfo.value=res.data
    renderCharts()
}


//3.渲染页面--》echars-->百度-->柱状图，饼形图，折线图


//4.每隔5s发送一次请求--》定时器，定时执行--》
const startPolling=()=>{
    getServerData()
    pollInterval=setInterval(getServerData,5000)//每间隔5秒请求一次数据
}
//5.当组件挂载时，开启定时器，组件销毁时，清理定时器
onMounted(()=>{     //组件挂载
    startPolling();
})
onBeforeUnmount(()=>{
    if(pollInterval){
        clearInterval(pollInterval)
    }
})


</script>
<style scoped>

</style>