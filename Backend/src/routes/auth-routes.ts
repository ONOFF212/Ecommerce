
import Router from "@koa/router"

import { signup, login } from "../controllers/auth-controller.ts";

export const authRouter = new Router({prefix:'/public'});

authRouter.post('/register', signup);
authRouter.post('/login', login);
