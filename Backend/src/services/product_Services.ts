
import { Context } from "node:vm";
import { AppDataSource } from "../dbconfig/db_config.ts";
import { Products } from "../models/product_model.ts";


export const getItemList = async ()  => {
    const productRepo = await AppDataSource.getRepository(Products);
    return await productRepo.find();
};

export const getItemsById = async (ctx:Context) => {
    const productRepo = await AppDataSource.getRepository(Products);
    return await productRepo.findOneBy({
        id : ctx.parmas.id
    });
};