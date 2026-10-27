
import { Context } from 'koa';
import { fetchProducts, getItemByCategory, getItemBySearch } from '../services/productServices.ts';

export const getProducts = async (ctx:Context) => {
    const data = ctx.query;

    const category = String(data.category) ?? "";
    const sort = String(data.sort) ?? "";
    const page = Number(data.page) || 1;
    const limit = Number(data.limit) || 10; 
    const minPrice = Number(data.minPrice) || 0;
    const maxPrice = Number(data.maxPrice) || 0;

    if(typeof data.search === 'string' && data.search !== ""){
        const result = await getItemBySearch(data.search, sort, minPrice, maxPrice, page, limit);
        ctx.body={
            message:"From search params: ",
            result
        }
        return;
    }

    if(typeof data.category === "string" && data.category !== "" ){
        
        const result = await getItemByCategory(category, sort, minPrice, maxPrice, page, limit);
        ctx.body={
            message:"From category params: ",
            result
        }
        return;
    }

    const result = await fetchProducts(sort,minPrice, maxPrice, page, limit);
    ctx.body = {
            message:"Initial Search Done....",
            result
    };
};

export const getProductsById = async (ctx:Context) => {
    // const {id} = ctx.request.body as any;
    // const result = await getItemsById(id);
    // if(!result){
    //     return {
    //         message:"Failed to Find the Product details"
    //     }
    // }
    // ctx.body = result;
};