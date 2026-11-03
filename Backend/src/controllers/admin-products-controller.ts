
import { Context } from "koa";
  
import { ProductInput , productSchema } from "../validators/admin-products-validator.ts";
import { queryParmasSchema } from '../validators/product-validator.ts';
import {createProduct, 
        deleteProduct, 
        findProductById, 
        fetchProducts, 
        updateProduct 
} from "../services/admin-products-service.ts";

export const adminCreateProduct = async (ctx:Context) =>{
    
    const validatedData : ProductInput = await productSchema.validate(ctx.request.body, {abortEarly:false});

    const imgUrl = ctx.file.filename;

    await createProduct({name:validatedData.name, 
                         price:validatedData.price, 
                         stock:validatedData.stock, 
                         description:validatedData.description, 
                         imgUrl, 
                         categoryId:validatedData.category
    });

    ctx.status = 200;
    ctx.body={
        message:"Product Added Successfully"
    }
};

export const getProducts = async (ctx:Context) =>{
    const validatedQueryParams = await queryParmasSchema.validate(ctx.query);

    const search = validatedQueryParams.search ? String(validatedQueryParams.search) : "";
    const category = validatedQueryParams.category ? String(validatedQueryParams.category) : "";
    const sort = validatedQueryParams.sort ? String(validatedQueryParams.sort) : "";
    const page = validatedQueryParams.page || 1;
    const limit = validatedQueryParams.limit || 10; 
    const minPrice = validatedQueryParams.minPrice ?? null;
    const maxPrice = validatedQueryParams.maxPrice ?? null;

    const products = await fetchProducts({search, category, sort, minPrice, maxPrice, page, limit});
    ctx.body={
        message:"From search params: ",
        products
    }
};

export const getProductById = async (ctx:Context) =>{
    const {id} = ctx.params;
     const product = await findProductById(id);

     if(!product){
         return {
             message:"Failed to Find the Product details"
         }
     }
     ctx.body = product;
};

export const adminUpdateProduct = async (ctx:Context) =>{

    const validatedData : ProductInput = await productSchema.validate(ctx.request.body, {abortEarly:false});

    const imgFilename = ctx.file.filename;

    const updatedProduct = await updateProduct(ctx.params.id,{name:validatedData.name, price:validatedData. price, stock:validatedData.stock, description:validatedData.description, imgUrl:imgFilename, categoryId:validatedData.category});

    ctx.status = 200;
    ctx.body = {
        result:updatedProduct
    }

};

export const adminDeleteProduct = async (ctx:Context) =>{

    const isDeleted = await deleteProduct(ctx.params.id);
    if(isDeleted) {
        ctx.status = 200;
        ctx.body = {message:"Product delete done..."}
        return;
    }

    ctx.status = 404;
    ctx.body ={
        message:"Failed to Delete Produt. Try again...."
    }
};