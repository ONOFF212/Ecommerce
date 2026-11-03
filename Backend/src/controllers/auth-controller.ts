
import { Context } from "koa";
import { createUser, findByEmail } from "../services/auth-service.ts";
import { hashPassword, comparePassword } from "../utils/hashing-utils.ts";
import { generateToken } from "../utils/jwt-token-utils.ts";

import { findRoleID } from '../services/role-service.ts'
import { findUserByEmail, findUserById } from "../services/user-service.ts";
import { loginSchema, userSignupSchema } from "../validators/auth-validator.ts";


export const signup = async(ctx:Context) => {

    const validatedUser = await userSignupSchema.validate(ctx.request.body, {abortEarly:false});

    const hashedPassword = await hashPassword(validatedUser.password);
    if(!hashedPassword){
        ctx.body = {message:"Failed to hased password"};
        return;
    }

    const role = await findRoleID("customer");
    if(role === null || role === undefined) {
        ctx.body = {message:"Error at assigning role...."};
        return;
    }
    const roleId = role?.id;

    await createUser({name:validatedUser.name, email:validatedUser.email, password:hashedPassword, roleId});

    const user = await findByEmail(validatedUser.email);
    if(!user){
        ctx.body = {
            message:"failed to create account",
        }
        return;
    }

    const token = await generateToken({id:user.id ,name:user.name, email:user.email, role:{name:user.roles.name}});

    ctx.set('Authorization', token);
    ctx.body = {
        message:"User Created successfully......",
        user,
        Token:token,
    }
};

export const login = async(ctx:Context) => {
    
    const validatedLogin = await loginSchema.validate(ctx.request.body, {abortEarly:false});

    const existingUser = await findUserByEmail(validatedLogin.email);
    if(!existingUser) {
        return {
            success:true,
            message:"User Not Found....",
            };
    }
    
    const isPasswordValid = await comparePassword(validatedLogin.password, existingUser.password);
    if (!isPasswordValid) {
        return {
            success:true,
            message: "Password didn't Match" , 
        };
    }

    const user = await findByEmail(validatedLogin.email);
    if(!user){
        ctx.body = {
            message:"failed to create account",
        }
        return;
    }
    const token = await generateToken({id:user.id ,name:user.name, email:user.email, role:{name:user.roles.name}});
    
    ctx.body = {
        message:"Login Sucessful....",
        user,
        Token:token
    }
};