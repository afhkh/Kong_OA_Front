import request from "../http";
// 查询参数写法
export const reqUserList=(params)=>request.get('system/user/users',{params})
//请求体参数写法
export const reqDeleteUser=(ids)=>request.delete('system/user/users',{data:ids})