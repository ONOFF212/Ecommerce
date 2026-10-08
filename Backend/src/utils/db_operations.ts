
import { Users } from "../models/user_model.ts";
import { db_Connection } from "../dbconfig/db_config.ts";
import { generateToken } from "./jwt_token.ts";

const userRepo = db_Connection.getRepository(Users);

export async function getuser(email:string){

    return await userRepo.findOne({
        where:{
            email
        },
        relations:{
            roles:true
        }
    });
};

export async function updateUserDetail(id:number, name:string, email:string){
    
    await userRepo.save({
        id,
        name,
        email
    });  
};

