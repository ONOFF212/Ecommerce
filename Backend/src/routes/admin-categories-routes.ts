
import Router from "@koa/router";

import { roleBasedMiddleware } from "../middlewares/role-based-middleware.ts";
import { adminCreateCategory, 
         adminGetCategories, 
         adminUpdateCategory, 
         adminDeleteCategory 
        }
from "../controllers/admin-categories-controller.ts";

export const adminCategoryRouter = new Router({prefix:"/api/admin"});
adminCategoryRouter.use(roleBasedMiddleware);

adminCategoryRouter.post("/categories", adminCreateCategory);
adminCategoryRouter.get("/categories",  adminGetCategories);
adminCategoryRouter.put("/categories/:id", adminUpdateCategory);
adminCategoryRouter.delete("/categories/:id",  adminDeleteCategory);
