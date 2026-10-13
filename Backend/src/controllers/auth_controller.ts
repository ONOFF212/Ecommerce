
import { Context } from "koa";
import { createUser, loginUser } from "../services/auth_services.ts";
import { userTypes } from "../type_Checking/user_dbType.ts";


export const signup = async(ctx:Context) => {
    const data = ctx.request.body as userTypes;
    console.log(ctx.request.body);
    const result = await createUser(ctx); 

    if (result.status === 201){
        return ctx.status;
    }
    
    return ctx.status = 500;
};

export const login = async(ctx:Context) => {
    const result = await loginUser(ctx);

    if (result?.status === 200){
            return ctx.status;
    }
    return ctx.status = 500;

};