
import Router from "@koa/router";

import { roleBasedMiddleware } from "../middlewares/role-based-middleware.ts";
import { CreateRole, 
         GetRoles, 
         UpdateRole, 
         DeleteRole 
        }
from "../controllers/role-controller.ts";

export const roleRouter = new Router({prefix:"/api/admin"});
roleRouter.use(roleBasedMiddleware);

roleRouter.post("/roles", CreateRole);
roleRouter.get("/roles",  GetRoles);
roleRouter.put("/roles/:id", UpdateRole);
roleRouter.delete("/roles/:id",  DeleteRole);
