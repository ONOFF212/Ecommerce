
import { AppDataSource } from "../dbconfig/db_config.ts";
import { Products } from "../entity/productEntity.ts";

import {  saveProductTypes } from "../type_Checking/productType.ts";

const productRepo = AppDataSource.getRepository(Products);


export  async function createProduct({name, price, stock, description, img_url, categoryId} : saveProductTypes){
    const user = productRepo.create({
        name,
        description,
        price,
        stock,
        img_url,
        category:{
            id:categoryId,
        }
    });
    return await productRepo.save(user);
};

export async function fetchProduct(){
    return await productRepo.find({
        relations:{
            category:true,
        }
    });
};


export async function findProductById(id:number){

    return await productRepo.findOne({
        where:{
            id,
        },
        relations:{
            category:true,
        }
    });
};

export async function updateProdut(id:number , {name, price, stock, description, img_url, categoryId} : saveProductTypes){
    const product = await productRepo.findOneBy({id});
    console.log("details: ", {name, price, stock, description, img_url, categoryId});
    if (!product) {
        return {message: "User not found"};
    }
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.description = description;
    product.img_url = img_url;
    product.category = {id:categoryId} as any ;

    await productRepo.save(product);
    return{
        message:"Product Updated Successfully....."
    }
};

export async function deleteProduct(id:number){
    return await productRepo.delete({id});
};