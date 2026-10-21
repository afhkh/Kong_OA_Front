import request from "../http";
//这是具名导出，别的文件引入要用"{名字}"引入
export const reqUserList=(params)=>request.post('system/user/users',{params})