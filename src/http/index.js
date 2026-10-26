import axios from "axios";
import { ElMessage } from "element-plus";
import $cookie from 'vue-cookies'

import { ElLoading } from 'element-plus'

//1.基本配置
const request=axios.create(
    {
        //基础配置：访问地址，编码格式，超时时间....
        baseURL:'http://127.0.0.1:8080/api/v1/',  //后期上线，只要变这里就可以了
        timeout:5000,
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        }
    }
)

let loadingInstance
//2.请求拦截器--》所有请求发送之前会执行
request.interceptors.request.use(config=>{
    //创建一个加载组件-----可以选择一些请求接口不使用此加载组件
    loadingInstance=ElLoading.service({
        lock:true,
        text:'加载中...',
        background:'rgba(0,0,0,0.5)'
    })
    //2.1从cookie中取出用户的登录信息，如果有，就放在请求头中携带
    let token=$cookie.get('token')
    if(token){
        config.headers.Authorization='Bearer '+token  //Bearer后面要加空格
    }
    return config
})

//3.响应拦截器
request.interceptors.response.use(response=>{
    //成功情况：100或非100，都是请求接口成功
    //response 后端接口返回的响应对象：响应头，响应体，响应状态码
    let res=response.data  //真正的响应体
    
    if(res.code==100){
        //请求成功，正常返回
        //加载组件销毁
        if (loadingInstance) {
            loadingInstance.close()
        }
        return res
    }else{
        //没成功，弹提示框
        //加载组件销毁
        if (loadingInstance) {
            loadingInstance.close()
        }
        ElMessage({
            message: !res.msg?'服务器异常，请联系系统管理员':res.msg,
            type: 'warning',
            })
        
        return Promise.reject(response.data.msg)
    }},
    //请求接口失败，超时了，没网
    error=>{
        if (loadingInstance) {
            loadingInstance.close()
        }
        ElMessage.error('服务器异常，请联系系统管理员')
        
        return Promise.reject(new Error(error.message))

    }
)

//4.把请求对象导出
export default request