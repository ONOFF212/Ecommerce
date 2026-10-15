import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hash_password(password:string){
    return await  bcrypt.hash(password,saltRounds);
};

export async function comparePassword(password:string, hashed_password:string ){
    return await bcrypt.compare(password, hashed_password); 
};