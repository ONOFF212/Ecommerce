
import { Users } from "../entity/userEntity.ts";

import { AppDataSource } from "../dbconfig/db_config.ts";

import { userSignup, userLogin  } from "../type_Checking/userDBType.ts";
import {findUserByEmail} from '../services/userServices.ts'
import { comparePassword } from "../utils/hashingSecrets.ts";
import { generateToken } from "../utils/jwtToken.ts";


const userRepo = AppDataSource.getRepository(Users);


export  async function createUser({name, email, hashed_password, roleId}:userSignup){

    const user = userRepo.create({
        name,
        email,
        password:hashed_password,
        roles:{
            id:roleId
        }
    });
    console.log(user);
    return await userRepo.save(user);
};


export async function loginUser({email, password}:userLogin){
    const emailResult = await findUserByEmail(email);
    if(!emailResult) {
        return {
            success:true,
            message:"User Not Found....",
        };
    }

    const hashCompare = await comparePassword(password,emailResult.password);
    if (!hashCompare) {
        return {
            success:true,
            message: "Password didn't Match" , 
        };
    }

    const Token = await generateToken(emailResult);
    return {
        message:"Login Sucessful....",
        emailResult,
        Token
    }
};





