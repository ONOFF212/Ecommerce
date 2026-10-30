
import Router from "@koa/router";

import { rolebasemiddleware } from "../middlewares/roleBaseMiddleware.ts";
import {upload} from '../middlewares/multerMiddleware.ts';

import { adminCreateProduct, 
         adminFetchProduct, 
         adminUpdateProduct, 
         adminDeleteProduct,
         adminFetchById 
        }
from "../controllers/adminProductController.ts";

export const adminProductRouter = new Router({prefix:"/api/auth/admin"});

adminProductRouter.post("/products", upload.single("img_url") ,adminCreateProduct);
adminProductRouter.get("/products", adminFetchProduct);
adminProductRouter.get("/products/:id", adminFetchById);
adminProductRouter.put("/products/:id", upload.single("img_url"), adminUpdateProduct);
adminProductRouter.delete("/products/:id", adminDeleteProduct);
