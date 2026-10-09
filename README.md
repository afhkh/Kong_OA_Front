# Kong_OA_FRONT

Kong-OA 办公自动化（OA）系统的前端项目，基于 **Vue 3 + Vite** 构建，配合后端 FastAPI 提供的 `http://127.0.0.1:8080/api/v1` 接口使用。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue 3 |
| 构建工具 | Vite |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| UI 组件库 | Element Plus |
| 图表 | ECharts |
| HTTP 请求 | Axios |
| Cookie 管理 | vue-cookies |

## 功能模块

- **登录认证**：用户登录获取凭证（token），存入 cookie。
- **首页 / 仪表盘**：展示服务器性能等信息。
- **系统管理**：系统相关业务接口。

## 目录结构

```
Kong_OA_FRONT/
├── public/                 # 静态资源
├── src/
│   ├── api/                # 接口定义
│   │   ├── home.js         # 首页相关接口
│   │   └── system.js       # 系统相关接口（登录等）
│   ├── assets/             # 图片、样式等资源
│   │   ├── css/            # 全局样式
│   │   └── img/            # 图片资源
│   ├── components/         # 公共组件
│   ├── http/               # axios 封装（请求/响应拦截器）
│   │   └── index.js
│   ├── routers/            # 路由配置
│   │   └── index.js
│   ├── store/              # Pinia 状态管理
│   │   └── index.js
│   ├── views/              # 页面视图
│   │   ├── HomeView.vue
│   │   ├── HomeView_old.vue
│   │   ├── AboutView.vue
│   │   ├── LoginView.vue
│   │   └── LoginView2.vue
│   ├── App.vue
│   ├── main.js             # 入口文件
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
└── learn.md                # 开发学习笔记
```

## 快速开始

### 环境要求

- Node.js（建议 18+）
- npm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 打包构建

```bash
npm run build
```

### 本地预览构建产物

```bash
npm run preview
```

## 前后端约定

### 请求封装（`src/http/index.js`）

- **基础地址**：`http://127.0.0.1:8080/api/v1/`（上线时只需修改此处）
- **编码格式**：`application/json; charset=utf-8`
- **超时时间**：5000ms
- **请求拦截器**：若 cookie 中存在 token，则自动写入请求头 `Authorization`。
- **响应拦截器**：
  - 约定业务成功码为 `100`，成功时直接返回响应体 `data`；
  - 失败时使用 Element Plus 的 `ElMessage` 弹出错误提示，并 reject。

### 接口示例

```javascript
// 登录
export const reqLogin = (username, password) =>
  request.post('system/user/login', { username, password })

// 获取服务器性能信息
export const reqServerData = () => request.get('home/main/info')
```

## 路由说明

| 路径 | 组件 | 说明 |
| --- | --- | --- |
| `/` | HomeView | 首页 / 仪表盘 |
| `/about` | AboutView | 关于页 |
| `/login` | LoginView | 登录页 |
| `/login2` | LoginView2 | 登录页（备用） |

## 相关文档

- 开发过程中的学习笔记见 [learn.md](./learn.md)
