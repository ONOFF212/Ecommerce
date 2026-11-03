
import { AppDataSource } from "../db-config/db-config.ts";
import { User } from "../entities/user-entity.ts";
import { UserUpdate } from "../validators/user-validator.ts";

const userRepository = AppDataSource.getRepository(User);

export async function findUserByEmail(email:string){
    return await userRepository.findOne({
        where:{
            email,
        },
        select:{
            id:true,
            name:true,
            email:true,
            password:true,
            roles:{
                name:true,
            }
        },
        relations:{
            roles:true,
        }
    });
};

export async function findUserById(id:number){
    return await userRepository.findOne({
        where:{
            id,
        },
        select:{
            id:true,
            name:true,
            email:true,
            roles:{
                name:true,
            }
        },
        relations:{
            roles:true,
        }
    });
};


export async function updateUser(id:number, {name, email}:UserUpdate){
    return await userRepository.update(id, {name, email});
}
