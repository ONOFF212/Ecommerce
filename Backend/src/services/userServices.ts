
import { AppDataSource } from "../dbconfig/db_config.ts";
import { Users } from "../entity/userEntity.ts";
import { userUpdate } from "../type_Checking/authDBType.ts";


const userRepo = AppDataSource.getRepository(Users);


export async function findUserByEmail(email:string){
    return await userRepo.findOne({
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
    return await userRepo.findOne({
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


export async function updateUser(id:number, {name, email}:userUpdate){
    const user = await userRepo.findOneBy({ id });

    if (user) {
        user.name = name;
        user.email = email;
        await userRepo.save(user); 
        return;
    }
    return {messaage:"update Failed.."};
}
