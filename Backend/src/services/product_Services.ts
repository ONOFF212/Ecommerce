
import { Context } from "node:vm";
import { db_Connection } from "../dbConfig/dbconfig.js";
import { Products } from "../Models/produtcModel.js";


export const getItemList = async ()  => {
    const productRepo = db_Connection.getRepository(Products);
    return await productRepo.find();
};

export const getItemsById = async (ctx:Context) => {
    const productRepo = db_Connection.getRepository(Products);
    return await productRepo.findOneBy({
        id : ctx.parmas.id
    });
};