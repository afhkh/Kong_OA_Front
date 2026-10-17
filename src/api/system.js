//系统相关请求
//登录接口
import request from "../http";
//这是具名导出，别的文件引入要用"{名字}"引入
export const reqLogin=(username,password)=>request.post('system/user/login',{'username':username,'password':password})

export const reqMenus=()=>request.get('system/auth/menus')