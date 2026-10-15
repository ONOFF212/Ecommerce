
import { Context } from "koa";
import { createUser, loginUser } from "../services/authServices.ts";
import { hash_password } from "../utils/hashingSecrets.ts";
import { generateToken } from "../utils/jwtToken.ts";

import {findRoleID} from '../services/roleServices.ts'


export const signup = async(ctx:Context) => {
    const{name, email, password} = ctx.request.body as any;

    const hashed_password = await hash_password(password);
    if(!hashed_password){
        console.log("Failed to hased password");
        return;
    }

    const role = await findRoleID("customer");
    if(role === null || role === undefined) {
        console.log("Error at assigning role....");
        return;
    }
    const roleId = role?.id;

    const result = await createUser({name, email, hashed_password, roleId} as any);

    const Token = await generateToken(result);
    console.log("after save data is: ", result);

    ctx.set('Authorization', Token);
    ctx.body = {
        message:"User Created successfully......",
        user:{
            id:result.id,
            name:result.name,
            email:result.email,
            role:{
                name:role?.name,
            },
        },
        Token
    }
};

export const login = async(ctx:Context) => {
    const {email, password} = ctx.request.body as any;

    const result = await loginUser({email, password});

    if (result.success) {
        ctx.status = result.message === "User not found" ? 404 : 401;
        ctx.body = {
            message: result.message
        };
        return;
    }
    ctx.status = 200;
    ctx.body = {
        message: result.message,
        user:{
            id:result.emailResult?.id,
            name:result.emailResult?.name,
            email:result.emailResult?.email,
            role:{
                name:result.emailResult?.roles.name
            }
        },
        token: result.Token
    };
};