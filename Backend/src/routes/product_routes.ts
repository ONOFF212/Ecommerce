
import Router from "@koa/router";

import {getProducts, getProductsById} from '../controllers/product_controller.js';



export const router =new Router();


router.get('/products', getProducts);
router.get('/products/:id', getProductsById);

