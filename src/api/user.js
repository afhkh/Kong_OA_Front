import request from "../http";

export const reqUserList=(params)=>request.get('system/user/users',{params})