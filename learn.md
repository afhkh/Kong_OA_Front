# 学习笔记

> 本文件用于存放开发过程中的学习记录与笔记，内容与项目正式说明文档无关。
> 项目正式说明请查看 [README.md](./README.md)。

---

## 一、原始笔记：Kong_OA_Front

搭配前面项目那个后端

1. 安装 element：`npm install element-plus --save`
2. 项目中引入 --- main.js
   完整导入
   ```javascript
   import { createApp } from 'vue'
   import ElementPlus from 'element-plus'
   import 'element-plus/dist/index.css'
   import App from './App.vue'

   const app = createApp(App)

   app.use(ElementPlus)
   app.mount('#app')
   ```
3. 在项目中粘贴看效果即可

---

## 二、前端封装 axios

### 请求发送之前
- 1.1 请求发送之前，如果用户登录了，自动携带用户的登录信息
- 1.2 规定前后端交互的编码格式使用 json 格式
- 1.3 设置超时时间，自动提示错误
- 1.4 设置基础地址：`http://127.0.0.1:8080/api/v1`

### 响应回来后
- 1.1 判断响应状态码是不是我们规定的成功，如果成功，继续后续操作，如果不成功，提示错误（promise 语法）
- 1.2 直接取出 data 的数据
