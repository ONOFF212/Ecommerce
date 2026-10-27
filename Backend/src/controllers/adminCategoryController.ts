
import { Context } from "koa";

import { categorysType, categorySchema } from "../type_Checking/categoryType.ts";
import { createCategory,
         deleteCategory,
         fetchCategory, 
         updateCategory 
        } 
from "../services/adminCategoryServices.ts";


export const adminCreateCategory = async (ctx:Context) =>{

    const validatedData = await categorySchema.validate(ctx.request.body, {abortEarly:false});

    const result = await createCategory(validatedData.name);
    if(!result){
        ctx.body = {
            message:"Failed to Create Category."
        }
        return;
    };
    ctx.body = {
        message:"Category Created Successfully....",
        status:201
    }
};

export const adminFetchCategory = async (ctx:Context) =>{
    const result = await fetchCategory();
    
    if(result.length === 0) {
        ctx.body ={
            message:"Categoryies of the Product didn't find",
            status: 404
        }
        return;
    }
    ctx.body = {
        result
    }

};

export const adminUpdateCategory = async (ctx:Context) =>{
    const {name} = ctx.request.body as categorysType;
    
    if(name === null || name === '' || name === undefined) {
        ctx.body = {
            message:"Category name is not defined",
            status:400
        }
        return;
    }
    const result = await updateCategory(ctx.params.id, name);
    if(!result){
        ctx.body={
            message:"Failed to update category",
            status:400
        }
        return;
    }
    ctx.body = {
        result,
        status:200
    }

};

export const adminDeleteCategory = async (ctx:Context) =>{
    const result = await deleteCategory(ctx.params.id);
    if(result) {
        ctx.body = {message:"Category deleted", status:100}
        return;
    }
    ctx.body ={
        message:"Failed to Delete . Try again....",
        status:400
    }
};         