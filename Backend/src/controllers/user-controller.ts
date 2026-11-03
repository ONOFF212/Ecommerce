
import { Context } from "koa";

import { findUserById } from "../services/user-service.ts";
import { updateUser } from "../services/user-service.ts";
import { userSchema, UserUpdate } from "../validators/user-validator.ts";


export const getUser =  async(ctx:Context) =>{
    const {id} = ctx.state.user;
    const user = await findUserById(id);
    if(!user){
        ctx.status = 404;
        ctx.body={
            message:"User Not Found"
        }
        return;
    }

    ctx.body ={
        message:"User Details Found",
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:{
                name:user.roles.name
            }
        }
    }
};

export const updateUserDetails = async (ctx:Context) =>{
    const {id} = ctx.state.user;
    const validatedData : UserUpdate = await userSchema.validate(ctx.request.body, {abortEarly:false});

    const existingUser = await findUserById(id);
    if(!existingUser){
        ctx.status = 404;
        ctx.body={
            message:"User Not Found"
        }
        return;
    }
    if(validatedData.name === undefined || validatedData.name === ''){ validatedData.name = existingUser?.name; }
    if(validatedData.email === undefined || validatedData.email === ''){ validatedData.email = existingUser?.email; }

    await updateUser(id,{name:validatedData.name, email:validatedData.email});
    const updatedUser = await findUserById(id);

    ctx.body = {
        message:"User Details Updated Successfully",
        user:{
            id:updatedUser?.id,
            name:updatedUser?.name,
            email:updatedUser?.email,
            role:{
                name:updatedUser?.roles.name,
            }
        }
    }
};