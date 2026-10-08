
import Router from "@koa/router"

import {signup, login} from "../controllers/auth_controller.ts";

export const auth_router = new Router({prefix:'/api/auth'});

auth_router.post('/register', signup);
auth_router.post('/login', login);
