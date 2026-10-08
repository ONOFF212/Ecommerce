
import { Context } from "koa";

import { getUserDetail, userDataUpdate } from "../services/user_services.ts";


export const getUser =  async(ctx:Context) =>{
    const {email} = ctx.state.user;
    const data = await getUserDetail(email);
    ctx.status = 200;
    ctx.body = {
        message:"User details fetched",
    } 
};

export const updateUserDetail = async (ctx:Context) =>{
    
    const updateResult = await userDataUpdate(ctx);
    ctx.status = 200;
    ctx.body = {
        message:"Updated successfull",
    };
};