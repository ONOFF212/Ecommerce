
import { Role } from "../entities/role-entity.ts";
import { AppDataSource } from "../db-config/db-config.ts";


const roleRepository = AppDataSource.getRepository(Role);

export async function findRoleID (role:string){
    return await roleRepository.findOne({
        where:{
            name:role
        },
        select:{
            id:true,
            name:true
        }
    });
};

export async function createRole(name:string){
    const category =  roleRepository.create({
        name,
    });
    return await roleRepository.save(category);
};

export async function getRoles(){
    return await roleRepository.find();
};

export async function updateRole(id:number, name:string){
   return await roleRepository.update(id, {name});
};

export async function deleteRole(id:number){
    return await roleRepository.softDelete({id});

};