
import { Context } from "koa";

import { getUserDetail, userDataUpdate } from "../services/user_services.ts";
import { userUpdate } from "../type_Checking/user_dbType.ts";


export const getUser =  async(ctx:Context) =>{
    const {id} = ctx.state.user;
    const data = await getUserDetail(id);

    ctx.body = {
        message:"User details fetched",
        user:{
            id:data.result.id,
            name:data.result.name,
            email:data.result.email,
            role:data.result.roles.name
        },
        status:200
    } 
};

export const updateUserDetail = async (ctx:Context) =>{
    const { id } = ctx.state.user;
    
    const data = ctx.request.body as userUpdate;
    const {role} = ctx.request.body as any;
    const updateResult = await userDataUpdate(data, id);
    ctx.status = 200;
    ctx.body = {
        message:"Updated successfull",
        user:{
            id:updateResult.user?.id,
            name:updateResult.user?.name,
            email:updateResult.user?.email,
            role:role
        },
        status:200
    };
};