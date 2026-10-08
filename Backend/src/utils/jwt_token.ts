
import 'dotenv/config';
import  jwt  from "jsonwebtoken";

import { userTypes } from '../type_Checking/user_dbType.ts';
import { Context } from 'koa';

const JWT_SECRET = String(process.env.JWT_KEY);

export function generateToken(users:any){
    const { id, email } = users as userTypes;
    const token = jwt.sign({ id, email }, JWT_SECRET, {expiresIn:'7d'});
    return token;
};

export function verifyToken(token:string){
    try {
        return jwt.verify(token, JWT_SECRET);
        
    } catch (error) {
        return console.log("JWT Verification failed Error:", error);
        
    }
};
