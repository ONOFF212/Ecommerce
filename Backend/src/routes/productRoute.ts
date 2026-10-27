
import Router from "@koa/router";
import {getProducts, getProductsById} from '../controllers/productController.ts';


export const product_router = new Router({prefix:"/api/auth"});

product_router.get('/products', getProducts);
product_router.get('/products/:id', getProductsById);
