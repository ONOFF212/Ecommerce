

import bcrypt from "bcrypt";
import { verifyPass } from "./verify_dbdata.ts";
import { loginTypes } from "../type_Checking/user_dbType.ts";


const saltRounds = 10;

export const hash_password = async (password:string) => {
    
    const hash = await bcrypt.hash(password,saltRounds);
    if(!hash) {
        console.log("Error Hash password");
    }
    console.log("Hashing Successfull......");
    return hash;
    //console.log(`hash${hash}`)
};

export async function comparePassword(password:string, hashed_password:string ){
    return await bcrypt.compare(password, hashed_password); 
};