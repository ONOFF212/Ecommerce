
import { Context } from "node:vm";
import { AppDataSource } from "../dbconfig/db_config.ts";
import { Products } from "../entity/productEntity.ts";


export const getItemList = async ()  => {
    const productRepo = await AppDataSource.getRepository(Products);
    return await productRepo.find();
};

export  async function getItemsById(id:any){
    const productRepo = await AppDataSource.getRepository(Products);
    return await productRepo.findOne({
        where:{
            id
        },
        select:{
            id:true,
            name:true,
            img_url:true,
            price:true,
            stock:true,
            description:true,
        }
    });
};