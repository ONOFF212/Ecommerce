
import { Context } from "koa";

import { Users } from "../models/user_model.ts";
import { db_Connection } from "../dbconfig/db_config.ts";

import { userTypes, loginTypes  } from "../type_Checking/user_dbType.ts";
import { comparePassword, hash_password } from "../utils/hashing_secrets.ts";
import { Repository } from "typeorm";
import { Roles } from "../models/role_model.ts";

import { generateToken } from "../utils/jwt_token.ts";
import { verifyEmail,verifyPass } from "../utils/verify_dbdata.ts";

async function rolecheck(role:string): Promise<Roles> {
    const roleRepo = await db_Connection.getRepository(Roles);
    const findRole = await roleRepo.findOneBy({
        name:role,
    });
    return findRole as Roles;
};

export const createUser = async (ctx:Context)=>{
    const {name, email, password, role} = ctx.request.body as userTypes;
    
    const userRepo = await db_Connection.getRepository(Users);

    const roless = await rolecheck(role);

    const hashedPassword = await hash_password(password);
    const users = userRepo.create({
        name : name,
        email:email,
        hashed_password:hashedPassword,
        roles:roless
    } );
    await userRepo.save(users);

    const Token = await generateToken(users);
    console.log(Token);
    ctx.status = 201;
    ctx.body = {
        message:"User Created Succesfull",
        Token:Token
    };

    return ctx.status;
};

export const loginUser = async (ctx:Context) => {
    const {email, password} = ctx.request.body as loginTypes;

    const emailResult = await verifyEmail(email);

    if(emailResult === null){
        return ctx.body = {message:"Email doesn't exist...."};
    }
    
    const hashPassResult = await verifyPass(emailResult.email);
    if (!hashPassResult) {
        ctx.status = 404;
        ctx.body = {
            message: "Password hash not found..."
        };
        return;
    }

    const passResult = await comparePassword(password, hashPassResult.hashed_password);

    if(!passResult){
        return ctx.body = {message:"Password doesn't match..."};
    }
    const Token = await generateToken(emailResult);

    ctx.body = {
        message:"Login Successfull",
        Token:Token
    };
    return {token:Token, status:200}; 
};





