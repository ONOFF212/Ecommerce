
import { AppDataSource } from "../dbconfig/db_config.ts";
import { Products } from "../entity/productEntity.ts";

const productRepo = AppDataSource.getRepository(Products);

export  const getItemList = async ()  => {
    return await productRepo.find();
};

export  async function getItemsById(id:number){

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