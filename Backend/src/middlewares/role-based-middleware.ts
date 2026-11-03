
import { Context, Next } from "koa";

export const roleBasedMiddleware = async(ctx:Context, next:Next) => {

  const { role } = ctx.state.user;

  if(!role){
    ctx.status = 401 ;
    ctx.body = {
      message:"Unauthorized. Token is required"
    }
    return;
  }

  if (role.name !== 'admin') {
    ctx.status = 403;
    ctx.body = {
      message:'Forbidden. Admin access required'
    };
    return;
  }

  await next();
};
