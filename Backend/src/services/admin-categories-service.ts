
import { todo } from "node:test";
import { AppDataSource } from "../db-config/db-config.ts";

import { Category } from "../entities/category-entity.ts";

const categoryRepository =  AppDataSource.getRepository(Category);

export async function findCategoryByName(categoryName:string){
    return await categoryRepository.findOne({
        where:{
            name:categoryName,
        },
        select:{
            id:true,
        },
    });
};

export async function findCategoryById(id:number){
    return await categoryRepository.findOne({
        where:{
            id,
        },
        select:{
            id:true,
            name:true,
        },
    });
};

export async function createCategory(name:string){
    const category =  categoryRepository.create({
        name,
    });
    return await categoryRepository.save(category);
};

export async function getCategories(){
    return await categoryRepository.find();
};

export async function updateCategory(id:number, name:string){
   return await categoryRepository.update(id, {name});
};

export async function deleteCategory(id:number){
    return await categoryRepository.softDelete({id});

};