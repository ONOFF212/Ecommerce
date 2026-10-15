
import { Context } from 'koa';
import {getItemList, getItemsById} from '../services/productServices.ts';

export const getProducts = async (ctx:Context) => {
    const result = await getItemList();
    ctx.body = result;
};

export const getProductsById = async (ctx:Context) => {
    const {id} = ctx.request.body as any;
    const result = await getItemsById(id);
    if(!result){
        return {
            message:"Failed to Find the Product details"
        }
    }
    ctx.body = result;
};
