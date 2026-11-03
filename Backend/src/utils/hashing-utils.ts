import bcrypt from "bcrypt";
import 'dotenv/config';


export async function hashPassword(password:string){
    return await  bcrypt.hash(password,Number(process.env.SALT_ROUND));
};

export async function comparePassword(password:string, hashedPassword:string ){
    return await bcrypt.compare(password, hashedPassword); 
};