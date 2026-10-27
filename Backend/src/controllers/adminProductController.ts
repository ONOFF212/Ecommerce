
import { Context } from "koa";
  
import {updateProductTypes, productSchema } from "../type_Checking/productType.ts";
import {createProduct, 
        deleteProduct, 
        findProductById, 
        fetchProduct, 
        updateProdut 
} from "../services/adminProductServices.ts";
import { findCategoryByName } from "../services/adminCategoryServices.ts";

export const adminCreateProduct = async (ctx:Context) =>{
    
    const validatedData = await productSchema.validate(ctx.request.body, {abortEarly:false});

    console.log("create Product detail types checking: ", validatedData);

    const img_url = ctx.file.filename;

    const findCategoryId = await findCategoryByName(validatedData.category);
    if(!findCategoryId){
        ctx.body ={
            message:"Category Not Found",
            status:404
        }
        return;
    }
    const categoryId = findCategoryId.id;
    await createProduct({name:validatedData.name, 
                         price:validatedData.price, 
                         stock:validatedData.stock, 
                         description:validatedData.description, 
                         img_url, 
                         categoryId
    });

    ctx.body={
        message:"Product Added Successfully",
        status:200
    }
};

export const adminFetchProduct = async (ctx:Context) =>{
    const result = await fetchProduct();
    if(result.length === 0) {
        ctx.body ={
            message:"Products didn't find",
            status: 404
        }
        return;
    }
    ctx.body = {
        result
    }
};

export const adminFetchById = async (ctx:Context) =>{
    const {id} = ctx.params;
    const productId = Number(id);
  
    if(productId === undefined || !Number.isInteger(productId)){
        console.log("Product is not number");
        return;
    };
    const result  = await findProductById(productId);
    if(!result){
        ctx.body = {
            message:'Failed to fetch Data by ID',
            status:404
        }
        return;
    }
    ctx.body = {
        result
    }
};

export const adminUpdateProduct = async (ctx:Context) =>{
    let { name, price, stock, description, img_url, category} = ctx.request.body as updateProductTypes;
    
    console.log("inside admin product update function: ", {name, price, stock, description, img_url, category});
    const result = await findProductById(ctx.params.id);
    
    if(!result) {
        ctx.body = {
            message:"Product didn't Found. Try Another....",
            status:404
        }
        return;
    }

    const imgName = ctx.file.filename;
    console.log(imgName);
    if(name === null        || name === undefined)        {name = result?.name};
    if(price === null       || price === undefined)       {price = result?.price};
    if(stock === null       || stock === undefined)       {stock = result?.stock};
    if(description === null || description === undefined) {description = result?.description};
    img_url = imgName ?? result?.img_url;

    let categoryId ;  
    if(category === null || category === undefined){
        categoryId = result?.category?.id;
    }else{
        const categoryID = await findCategoryByName(category);
        if(!categoryID) {
            ctx.body = {
                message:"Product Category didn't Found. Try Another....",
                status:404
            }
            return;
        }
        categoryId = categoryID?.id;
    };

    const resultUpdate = await updateProdut(ctx.params.id,{name, price, stock, description, img_url, categoryId});

    ctx.body = {
        resultUpdate,
        status:200
    }

};

export const adminDeleteProduct = async (ctx:Context) =>{

    const result = await deleteProduct(ctx.params.id);
    if(result) {
        ctx.body = {message:"Product delete done...", status:100}
        return;
    }

    ctx.body ={
        message:"Failed to Delete Produt. Try again...."
    }
};