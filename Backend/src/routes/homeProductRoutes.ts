
import Router from "@koa/router";
import {getProducts, getProductsById} from '../controllers/homeProductController.ts';


export const home_product_router = new Router({prefix:"/api"});

home_product_router.get('/products', getProducts);
home_product_router.get('/products/:id', getProductsById);