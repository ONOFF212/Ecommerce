
import { Context } from "koa";

import { Users } from "../models/user_model.ts";
import { Roles } from "../models/role_model.ts";
import { AppDataSource } from "../dbconfig/db_config.ts";

import { userSignup, userLogin  } from "../type_Checking/user_dbType.ts";
import { comparePassword, hash_password } from "../utils/hashing_secrets.ts";
import { generateToken } from "../utils/jwt_token.ts";

const userRepo = AppDataSource.getRepository(Users);
const roleRepo = AppDataSource.getRepository(Roles);

async function findUser(email:string){
    return await userRepo.findOne({
        where:{
            email
        },
        select:{
            id:true,
            name:true,
            email:true,
            hashed_password:true,
            roles:{
                name:true,
            }
        },
        relations:{
            roles:true,
        }
    });
};

async function findRoleID (role:string){
    return await roleRepo.findOne({
        where:{
            name:role
        },
        select:{
            id:true,
            name:true
        }
    });
};

export  async function createUser(data:userSignup){
    const{name, email, password, role} = data;
    const hashed_password = await hash_password(password);

    const roleID = await findRoleID(role);
    if(!roleID) {
        throw new Error("Role not Found");
    }
    const roleId = roleID?.id;

    const user = userRepo.create({
        name,
        email,
        hashed_password,
        roles:{
            id:roleId
        }
    });

    await userRepo.save(user);
    console.log("User Data after save ......",user);

    const token = await generateToken(user);
    
    return {
        message:"User Created Successfully....",
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:roleID?.name
        },
        token
    }
};


export async function loginUser(data:userLogin){
    const {email, password} = data;

    const findUserDetail = await findUser(email);

    if (findUserDetail === null) {
            return {
                 message: "E-mail didn't Found" , 
                 status: 401 
            };
    }

    const passResult = await comparePassword(password, findUserDetail.hashed_password);

    if (!passResult) {
            return {
                 message: "Password didn't Match" , 
                 status: 401 
            };
    }
    const Token = await generateToken(findUserDetail);

    return{
        message:"Log In Successfull....",
        status:201,
        user:{
            id:findUserDetail.id,
            name:findUserDetail.name,
            email:findUserDetail.email,
            role:findUserDetail.roles.name
        },
        Token
    }
};





