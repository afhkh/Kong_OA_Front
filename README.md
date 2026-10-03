# Kong_OA_Front
搭配前面项目那个后端

1.安装element npm install element-plus --save
2.项目中引入---mian.js
    完整导入
        import { createApp } from 'vue'
        import ElementPlus from 'element-plus'
        import 'element-plus/dist/index.css'
        import App from './App.vue'

        const app = createApp(App)

        app.use(ElementPlus)
        app.mount('#app')

3.在项目中粘贴看效果即可


前端封装axios
-请求发送之前
    1.1请求发送之前，如果用户登录了，自动携带用户的登录信息
    1.2规定前后端交互的编码格式使用json格式
    1.3设置超时时间，自动提示错误
    1.4设置基础地址：http://127.0.0.1:8080/api/v1

-响应回来后
    1.1判断响应状态码是不是我们规定的成功，如果成功，继续后续操作，如果不成功，提示错误
        promise 语法
    1.2直接取出data的数据