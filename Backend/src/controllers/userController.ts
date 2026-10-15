
import { Context } from "koa";

import { findUserById } from "../services/userServices.ts";
import { updateUser } from "../services/userServices.ts";


export const getUser =  async(ctx:Context) =>{
    const {id} = ctx.state.user;
    const result = await findUserById(id);
    if(!result){
        ctx.body={
            message:"User Not Found"
        }
        return;
    }

    ctx.body ={
        message:"User Details Found",
        user:{
            id:result.id,
            name:result.name,
            email:result.email,
            role:{
                name:result.roles.name
            }
        }
    }
};

export const updateUserDetail = async (ctx:Context) =>{
    const {id} = ctx.state.user;
    let {name, email} = ctx.request.body as any;
    const userResult = await findUserById(id);
        if(!userResult){
        ctx.body={
            message:"User Not Found"
        }
        return;
    }
    if(name === undefined || name === ''){ name = userResult?.name; }
    if(email === undefined || email === ''){ email = userResult?.email; }

    await updateUser(id,{name, email});
    const findUpdate = await findUserById(id);

    ctx.body = {
        message:"User Details Updated Successfully",
        user:{
            id:findUpdate?.id,
            name:findUpdate?.name,
            email:findUpdate?.email,
            role:{
                name:findUpdate?.roles.name,
            }
        }
    }
};