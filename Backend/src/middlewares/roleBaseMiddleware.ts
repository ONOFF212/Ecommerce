
import { Context } from "koa";

export const rolebasemiddleware = async(ctx:Context, next:any) => {

  const { role } = ctx.state.user;
    if (role.name === 'admin') {
      ctx.body = {
        message: "Access Granted",
        status : 100
      };
      await next();
      return;
    }
    ctx.body = {
      message: "Access denied",
      status : 403
    }
    return;
};
