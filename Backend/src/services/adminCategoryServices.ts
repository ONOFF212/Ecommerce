
import { AppDataSource } from "../dbconfig/db_config.ts";

import { Category } from "../entity/categoryEntity.ts";

const categoryRepo =  AppDataSource.getRepository(Category);

export async function findCategoryByName(categoryName:string){
    return await categoryRepo.findOne({
        where:{
            name:categoryName,
        },
        select:{
            id:true,
        }
    });
};

export async function createCategory(name:string){
    const cateogry =  categoryRepo.create({
        name,
    });
    return await categoryRepo.save(cateogry);
};

export async function fetchCategory(){
    return await categoryRepo.find({});
};

export async function updateCategory(id:number, name:string){
    const category = await categoryRepo.findOneBy({id});
    if (!category) {
        return {message: "Product Category not found"};
    }
    category.name = name;
    return await categoryRepo.save(category);
};

export async function deleteCategory(id:number){
    return await categoryRepo.delete({id});
};