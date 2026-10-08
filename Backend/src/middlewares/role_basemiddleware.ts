
import { Context } from "koa";
import { getUser } from "../controllers/user_controller.ts";

export const rolebasemiddleware = async(ctx:Context, next:any) => {

    const {email,role} = ctx.state.user;

    const roleData = await getUser(email);

    if (role != roleData) {
        ctx.status = 403;
        ctx.body = {
        message: "Access denied",
      };
      return;
    }
    await next();
};
