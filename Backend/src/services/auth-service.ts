
import { User } from "../entities/user-entity.ts";
import { AppDataSource } from "../db-config/db-config.ts";
import { CreateUser } from "../validators/user-validator.ts";

const userRepository = AppDataSource.getRepository(User);

export  async function createUser({name, email, password, roleId}:CreateUser){

    const user = userRepository.create({
        name,
        email,
        password,
        roles:{
            id:roleId
        }
    });

    return await userRepository.save(user);
};

export async function findByEmail(email:string){
    return await userRepository.findOne({
        where:{
            email,
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







