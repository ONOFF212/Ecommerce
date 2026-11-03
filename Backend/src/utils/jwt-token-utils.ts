
import 'dotenv/config';
import  jwt  from "jsonwebtoken";
import { UserTokenPayload } from '../validators/auth-validator.ts';

const JWT_SECRET = String(process.env.JWT_KEY);
const JWT_EXPIRE_TIME = Number(process.env.JWT_EXPIRE);

export async function generateToken(user:UserTokenPayload){
    const { id,name, email, role } = user;
    return jwt.sign({ id, name , email, role }, JWT_SECRET, {expiresIn:JWT_EXPIRE_TIME || '7d'});
};

export function verifyToken(token:string){
    try {
        return jwt.verify(token, JWT_SECRET);
        
    } catch (error) {
        return console.log("JWT Verification failed Error:", error);
        
    }
};
