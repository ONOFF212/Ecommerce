
import { AppDataSource } from "../dbconfig/db_config.ts";
import { Users } from "../models/user_model.ts";
import { Roles } from "../models/role_model.ts";
import { hash_password } from "../utils/hashing_secrets.ts";

const userRepo = AppDataSource.getRepository(Users);
const roleRepo = AppDataSource.getRepository(Roles);
async function findUser(id:number){
    return await userRepo.findOne({
        where:{
            id
        },
        select:{
            id:true,
            name:true,
            email:true,
            hashed_password:true,
            roles:{
                id:true,
                name:true,
            }
        },
        relations:{
            roles:true,
        }
    });
};

async function findRoleID (role:string){
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

async function update(id:number, {name, email, password, role}:any){

    const user = await userRepo.findOneBy({ id:id});

    if (user) {
        user.name = name;
        user.email = email;
        user.hashed_password = password; 
        user.roles = {
            id: role
        }as any;

        await userRepo.save(user); 
    }
    return {user:user}
}

export async function getUserDetail(id:number){ 
    const result = await findUser(id);
    if(result === null){
        throw new Error("No User Found.....");
    }
    return {
        result
    }
};


export async function userDataUpdate(data:any, id:number){
    const userResult = await findUser(id);
    if(userResult === null){
        return {messaage:"No user Found..."};
    }
    let {name, email, password, role} = data ;
    if(name === undefined || name === ''){ name = userResult.name; }
    if(email === undefined || email === ''){ email = userResult.email; }
    if(password === undefined || password === ''){ password = userResult.hashed_password;}
    else{
        password = await hash_password(password);
    }

    if(role === undefined || role === ''){ role = userResult.roles.id; }
    if(role != undefined) {
        role = await findRoleID(role);
    }
    const result = await update(id, {name, email, password, role});

    console.log(result.user);
    return {
        user:{
            id:result.user?.id,
            name:result.user?.name,
            email:result.user?.email,
            role:role,
        }
    }
};