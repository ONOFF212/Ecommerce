import bcrypt from "bcrypt";
import 'dotenv/config';


export async function hash_password(password:string){
    return await  bcrypt.hash(password,Number(process.env.SALT_ROUND));
};

export async function comparePassword(password:string, hashed_password:string ){
    return await bcrypt.compare(password, hashed_password); 
};