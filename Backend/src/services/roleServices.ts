
import { Roles } from "../entity/roleEntity.ts";
import { AppDataSource } from "../dbconfig/db_config.ts";


const roleRepo = AppDataSource.getRepository(Roles);

export async function findRoleID (role:string){
    return await roleRepo.findOne({
        where:{
            name:role
        },
        select:{
            id:true,
            name:true
        }
    });
};