
import { Context } from "koa";
import { getuser, updateUserDetail } from "../utils/db_operations.ts";
import { userTypes } from "../type_Checking/user_dbType.ts";
import { generateToken } from "../utils/jwt_token.ts";


export const getUserDetail = async(email:string) => { 
    const result = await getuser(email);
    return result;
};


export const userDataUpdate = async(ctx:Context) => {
    const { id } = ctx.state.user;
    const {name, email} = ctx.request.body as userTypes;
    const result = await updateUserDetail(id, name, email);
    
    return await generateToken(ctx);
};