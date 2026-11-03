
import { Context } from "koa";

import { CategoryInput, categorySchema } from "../validators/admin-categories-validator.ts";
import { createCategory,
         deleteCategory,
         getCategories, 
         updateCategory,
         findCategoryByName 
        } 
from "../services/admin-categories-service.ts";


export const adminCreateCategory = async (ctx:Context) =>{

    const validatedData : CategoryInput = await categorySchema.validate(ctx.request.body, {abortEarly:false});

    const isCategory = await findCategoryByName(validatedData.name);
    if(!isCategory) {
        ctx.body ={
            message:"category didn't found. Try another one",
        }
        return;
    }

    await createCategory(validatedData.name);

    ctx.status = 201;
    ctx.body = {
        message:"Category Created Successfully...."
    }
};

export const adminGetCategories = async (ctx:Context) =>{
    const categories = await getCategories();
    
    ctx.status= 200
    ctx.body = {
        categories
    }

};

export const adminUpdateCategory = async (ctx:Context) =>{
    const validatedData : CategoryInput = await categorySchema.validate(ctx.request.body, {abortEarly:false});

    await updateCategory(ctx.params.id, validatedData.name);
    
    ctx.status = 200;
    ctx.body = {
        message:"Category Updated Succesful",
        updateCategory
    }

};

export const adminDeleteCategory = async (ctx:Context) =>{
    const isDeleted = await deleteCategory(ctx.params.id);
    if(isDeleted) {
        ctx.status = 200;
        ctx.body = {message:"Category deleted"}
        return;
    }

    ctx.status = 400
    ctx.body ={
        message:"Failed to Delete . Try again...."
    }
};         