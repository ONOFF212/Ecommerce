
import Router from "@koa/router";
import { getUser, updateUserDetails } from "../controllers/user-controller.ts";


export const userRouter = new Router({prefix:"/api/users"});

userRouter.get("/me", getUser);
userRouter.put("/me/:id", updateUserDetails);
