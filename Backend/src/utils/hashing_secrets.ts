import bcrypt from "bcrypt";

const saltRounds = 10;

export function hash_password(password:string){
    
    const hash =  bcrypt.hash(password,saltRounds);
    if(!hash) {
        console.log("Error Hashing password");
        return;
    }
    console.log("Hashing Successfull......");
    return hash;
};

export async function comparePassword(password:string, hashed_password:string ){
    return await bcrypt.compare(password, hashed_password); 
};