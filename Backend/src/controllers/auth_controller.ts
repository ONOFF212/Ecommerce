
import { Context } from "koa";
import { createUser, loginUser } from "../services/auth_services.ts";


export const signup = async(ctx:Context) => {
    const result = await createUser(ctx); 

    if (result === 201){
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