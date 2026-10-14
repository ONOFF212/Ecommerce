
import 'dotenv/config';
import  jwt  from "jsonwebtoken";

import { userSignup } from '../type_Checking/user_dbType.ts';


const JWT_SECRET = String(process.env.JWT_KEY);

export function generateToken(user:any){
    const { id,name, email } = user as userSignup;
    return jwt.sign({ id, name , email }, JWT_SECRET, {expiresIn:'7d'});
};

export function verifyToken(token:string){
    try {
        return jwt.verify(token, JWT_SECRET);
        
    } catch (error) {
        return console.log("JWT Verification failed Error:", error);
        
    }
};
