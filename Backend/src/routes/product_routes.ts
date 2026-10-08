
import Router from "@koa/router";

import {getProducts, getProductsById} from '../controllers/product_controller.ts';



export const product_router =new Router({prefix:"/api"});


product_router.get('/products', getProducts);
product_router.get('/products/:id', getProductsById);

