
import Router from "@koa/router";

import { roleBasedMiddleware } from "../middlewares/role-based-middleware.ts";
import { upload } from '../middlewares/multer-middleware.ts';

import { 
        adminCreateProduct, 
        getProducts, 
        adminUpdateProduct, 
        adminDeleteProduct,
        getProductById 
} from "../controllers/admin-products-controller.ts";

export const adminProductRouter = new Router();

adminProductRouter.post("/admin/products", roleBasedMiddleware, upload.single("img_url") ,adminCreateProduct);
adminProductRouter.get("/public/products", getProducts);
adminProductRouter.get("/public/products/:id", getProductById);
adminProductRouter.put("/admin/products/:id", roleBasedMiddleware, upload.single("img_url"), adminUpdateProduct);
adminProductRouter.delete("/admin/products/:id", roleBasedMiddleware, adminDeleteProduct);
