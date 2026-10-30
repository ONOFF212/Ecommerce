
import Router from "@koa/router";

import { rolebasemiddleware } from "../middlewares/roleBaseMiddleware.ts";
import { adminCreateCategory, 
         adminFetchCategory, 
         adminUpdateCategory, 
         adminDeleteCategory 
        }
from "../controllers/adminCategoryController.ts";

export const adminCategoryRouter = new Router({prefix:"/api/auth"});

adminCategoryRouter.post("/categorys", adminCreateCategory);
adminCategoryRouter.get("/categorys",  adminFetchCategory);
adminCategoryRouter.put("/categorys/:id", adminUpdateCategory);
adminCategoryRouter.delete("/categorys/:id",  adminDeleteCategory);
