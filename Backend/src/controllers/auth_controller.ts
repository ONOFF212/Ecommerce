
import { Context } from "koa";
import { createUser, loginUser } from "../services/auth_services.ts";
import { userSignup, userLogin } from "../type_Checking/user_dbType.ts";

export const signup = async(ctx:Context) => {

    const userData = ctx.request.body as userSignup;
    console.log(userData);

    const result = await createUser(userData);
    ctx.set('Authorization', result.token);
    
    ctx.body = {
        message:result.message,
        user:result.user,
        status:201
    };
};

export const login = async(ctx:Context) => {
    const userData = ctx.request.body as userLogin;

    const result = await loginUser(userData) as any;
    if (result.status == 201) {
        ctx.status = 200; 
            
        ctx.set('Authorization', result.Token); 
        ctx.body = {
            message: result.message,
            user: result.user,
            Token:result.Token,
            status: 200
        };
        return;
    }
    ctx.body = {
        message: result.message,
        status: 404
    };
};