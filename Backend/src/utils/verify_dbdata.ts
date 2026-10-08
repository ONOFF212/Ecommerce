
import { db_Connection } from "../dbconfig/db_config.ts";
import { Users } from "../models/user_model.ts";


const userRepo = await db_Connection.getRepository(Users);

export async function verifyEmail(email:string){
    return await userRepo.findOne({
        where:{
            email
        },
        select:{
            id:true,
            email:true
        }
    });
};

export async function verifyPass(emailResult:string){
    
    return await userRepo.findOne({
        where:{
            email:emailResult
        },
        select:{
            hashed_password:true
        }
    });
};

