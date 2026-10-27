
import { Context } from "koa";
import { createUser, findByEmail } from "../services/authServices.ts";
import { hash_password, comparePassword } from "../utils/hashingSecrets.ts";
import { generateToken } from "../utils/jwtToken.ts";

import { findRoleID } from '../services/roleServices.ts'
import { findUserByEmail, findUserById } from "../services/userServices.ts";
import { loginSchema, userSchema } from "../type_Checking/authDBType.ts";


export const signup = async(ctx:Context) => {

    const validatedData = await userSchema.validate(ctx.request.body, {abortEarly:false});

    const hashed_password = await hash_password(validatedData.password);
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

    await createUser({name:validatedData.name, email:validatedData.email, hashed_password, roleId});

    const result = await findByEmail(validatedData.email);
    if(!result){
        ctx.body = {
            message:"failed to create account",
        }
        return;
    }

    const Token = await generateToken({id:result.id ,name:result.name, email:result.email, role:{name:result.roles.name}});

    ctx.set('Authorization', Token);
    ctx.body = {
        message:"User Created successfully......",
        user:result,
        Token
    }
};

export const login = async(ctx:Context) => {
    
    const validatedLoginData = await loginSchema.validate(ctx.request.body, {abortEarly:false});

    const emailResult = await findUserByEmail(validatedLoginData.email);
    if(!emailResult) {
        return {
            success:true,
            message:"User Not Found....",
            };
    }
    
    const hashCompare = await comparePassword(validatedLoginData.password,emailResult.password);
    if (!hashCompare) {
        return {
            success:true,
            message: "Password didn't Match" , 
        };
    }

    const result = await findByEmail(validatedLoginData.email);
    if(!result){
        ctx.body = {
            message:"failed to create account",
        }
        return;
    }
    const Token = await generateToken({id:result.id ,name:result.name, email:result.email, role:{name:result.roles.name}});
    //const result = await findUserById(emailResult.id);
    
    ctx.body = {
        message:"Login Sucessful....",
        user:result,
        Token
    }
};