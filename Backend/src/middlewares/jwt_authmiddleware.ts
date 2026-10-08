
import jwt from 'jsonwebtoken';
import { Context } from 'koa';

import { verifyToken } from '../utils/jwt_token.ts';

export const jwtAuthMiddlware =async (ctx:Context, next:any) =>{
    
    const token = ctx.header.authorization?.split(' ')[1];
    console.log("headers" ,ctx.header);
    if(!token){
        return ctx.body ={
            message:"Unauthorized. Token is required.......",
            status:401
        }
    }
    
    try{
        const data  = verifyToken(token);
        ctx.state.user = data;
        console.log("cts.state.user verifytoken data:: ",ctx.state.user );
        await next();

    }catch(err){
        ctx.body = {
            message:"Invalid or Expired Token!!!"
        }
    }
};

