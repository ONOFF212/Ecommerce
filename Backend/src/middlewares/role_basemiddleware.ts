
import { Context } from "koa";
import { getUser } from "../controllers/user_controller.ts";

export const rolebasemiddleware = async(ctx:Context, next:any) => {
  const array = ['admin', "customer"];

  const { role } = ctx.state.user;

  for(let i = 0; i < array.length; i++){
    if (role == array[i]) {
      ctx.body = {
        message: "Access Granted",
        status : 100
      };
      await next();
    }
    i++;
  }
  ctx.body = {
    message: "Access denied",
    status : 403
  }
  return;
};
