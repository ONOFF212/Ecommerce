
import { Context } from 'koa';
import {getItemList, getItemsById} from '../services/product_Services.js';

export const getProducts = async (ctx:Context) => {
    const result = await getItemList();
    ctx.body = result;
};

export const getProductsById = async (ctx:Context) => {
    const result = await getItemsById(ctx);
    ctx.body = result;
};
