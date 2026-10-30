
import { Context } from 'koa';
import { fetchProducts, getItemsById } from '../services/productServices.ts';

export const getProducts = async (ctx:Context) => {
    const data = ctx.query;

    console.log(data.search, data.category, data.sort, data.minPrice, data.maxPrice, data.page, data.limit);
    const search = String(data.search) ?? null;
    const category = String(data.category) ?? null;
    const sort = String(data.sort) ?? null;
    const page = Number(data.page) || 1;
    const limit = Number(data.limit) || 10; 
    const minPrice = Number(data.minPrice) || 1;
    const maxPrice = Number(data.maxPrice) || 10000000;

    const result = await fetchProducts(search, category, sort, minPrice, maxPrice, page, limit);
    ctx.body={
        message:"From search params: ",
        result
    }

    // if(typeof data.category === "string" && data.category !== "" ){
        
    //     const result = await getItemByCategory(category, sort, minPrice, maxPrice, page, limit);
    //     ctx.body={
    //         message:"From category params: ",
    //         result
    //     }
    //     return;
    // }

    // const result = await fetchProducts(sort,minPrice, maxPrice, page, limit);
    // ctx.body = {
    //         message:"Initial Search Done....",
    //         result
    // };
};

export const getProductsById = async (ctx:Context) => {
    const {id} = ctx.params;
    const result = await getItemsById(id);
    if(!result){
        return {
            message:"Failed to Find the Product details"
        }
    }
    ctx.body = result;
};