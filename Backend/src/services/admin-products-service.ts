
import { AppDataSource } from "../db-config/db-config.ts";

import { Between, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { Product } from "../entities/product-entity.ts";
import {  CreateProduct } from "../validators/admin-products-validator.ts";
import { QueryParams } from '../validators/product-validator.ts';

const productRepository = AppDataSource.getRepository(Product);


export  async function createProduct({name, price, stock, description, imgUrl, categoryId} : CreateProduct){
    const product = productRepository.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        category:{
            id:categoryId,
        }
    });
    return await productRepository.save(product);
};

export async function fetchProducts({search, category, sort, minPrice, maxPrice, page, limit} : QueryParams){
   const [product, count] = await productRepository.findAndCount({
           where:{
               ...(search != null && typeof search === 'string' && {
                   name: ILike(`%${search.trim()}%` ),
               }),
               ...(category != null && typeof category === 'string' && {
                   category:{
                       name: ILike( `%${category.trim()}%` ),
                   }
               }),
               ...(minPrice != null && maxPrice != null ? 
                   {price: Between(minPrice, maxPrice)} : minPrice != null 
                       ? {price: MoreThanOrEqual(minPrice)} : maxPrice != null 
                           ? {price : LessThanOrEqual(maxPrice)} :{}
               ),
           },
           select:{
               id:true,
               name:true,
               description:true,
               price:true,
               stock:true,
               imgUrl:true,
               category:true,
           },
           relations:{
               category:true,
           },
           order:{
               ...(sort === "ASC" && {
                   price: "ASC",
               }),
               ...(sort === 'DESC'&&{
                   price:"DESC",
               }),
               ...(sort === 'A-Z' && {
                   name: "ASC"
               }),
               ...(sort === 'Z-A' && {
                   name:"DESC"
               })
           },
           skip:( page - 1 ) * limit,
           take:limit
       });
       return {product, count, currentPage:page, totalPage:Math.ceil(count/limit)};
};


export async function findProductById(id:number){

    return await productRepository.findOne({
        where:{
            id,
        },
        relations:{
            category:true,
        },select:{
            id:true,
            name:true,
            price:true,
            stock:true,
            description:true,
            imgUrl:true,
            category:true,
        }
    });
};

export async function updateProduct(id:number , {name, price, stock, description, imgUrl, categoryId} : CreateProduct){
    return await productRepository.update(id, {name, price, stock, description, imgUrl, category:{id:categoryId}});
};

export async function deleteProduct(id:number){
    return await productRepository.softDelete({id});
};