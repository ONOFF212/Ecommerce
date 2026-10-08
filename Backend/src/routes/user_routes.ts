
import Router from "@koa/router";

import { getUser, updateUserDetail } from "../controllers/user_controller.ts";

export const user_routes = new Router({prefix:"/api/users"});

user_routes.get("/me", getUser);
user_routes.put("/me", updateUserDetail);
