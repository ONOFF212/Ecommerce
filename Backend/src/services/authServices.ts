
import { Users } from "../entity/userEntity.ts";
import { AppDataSource } from "../dbconfig/db_config.ts";
import { saveUser } from "../type_Checking/authDBType.ts";


const userRepo = AppDataSource.getRepository(Users);


export  async function createUser({name, email, hashed_password, roleId}:saveUser){

    const user = userRepo.create({
        name,
        email,
        password:hashed_password,
        roles:{
            id:roleId
        }
    });

    return await userRepo.save(user);
};

export async function findByEmail(email:string){
    return await userRepo.findOne({
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







