
<template>
<h1>我才是真主页</h1>
    <div class="main">
        <h2>cpu核数为：{{ data.cpu_count }}</h2>
        <h2>cpu使用率为：{{ data.cpu_percent}}%</h2>

    </div>
    <hr>
    <h1>elementui的使用</h1>
    <el-button type="success" @click="showAlert">Success</el-button>

    <h1>布局的使用</h1>
    <el-row>
        <el-col :span="12">
            <div class="div1" />
        </el-col>
        <el-col :span="12">
            <div class="div2" />
        </el-col>
    </el-row>
</template>
<script setup>
import { ref } from 'vue';
//前后端打通案例--》使用封装后的axios发送请求
//-----之前------
// import axios from 'axios'
// const data=ref({})                             //1.准备一个响应式变量，初始为空对象
// axios.get('http://127.0.0.1:8080/api/v1/home/main/cpu')//2.向这个地址发GET请求
//     .then(res=>{                              //3.拿到响应后
//         if (res.data.code==100){                //判断后端返回的code
//             data.value=res.data.data            //成功就把数据存进data   res.data是整个JSON数据
//         }
//     })


//---之后-----
const data=ref({})
import { reqHomeData } from '../../api/home';
async function getHomeData(){
    let res = await reqHomeData()
    data.value =res.data
}
getHomeData()






function showAlert(){
    alert('弹出来了')
}

</script>
<style scoped>
.main{
    background-color: pink;
    height: 200px;
    width: 100%;
}

.div1{
    background-color: red;
    height: 20px;
}
.div2{
    background-color: aqua;
    height: 20px;
}
</style>