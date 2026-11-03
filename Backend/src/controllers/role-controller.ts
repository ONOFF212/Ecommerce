
import { Context } from "koa";

import { RoleInput, roleSchema } from "../validators/role-validator.ts";
import { createRole,
         deleteRole,
         getRoles, 
         updateRole 
        } 
from "../services/role-service.ts";

export const CreateRole = async (ctx:Context) =>{

    const validatedData : RoleInput = await roleSchema.validate(ctx.request.body, {abortEarly:false});

    await createRole(validatedData.name);

    ctx.status = 201;
    ctx.body = {
        message:"Role Created Successfully...."
    }
};

export const GetRoles = async (ctx:Context) =>{
    const categories = await getRoles();
    
    ctx.status= 200
    ctx.body = {
        categories
    }

};

export const UpdateRole = async (ctx:Context) =>{
    const validatedData : RoleInput = await roleSchema.validate(ctx.request.body, {abortEarly:false});

    await updateRole(ctx.params.id, validatedData.name);
    
    ctx.status = 200;
    ctx.body = {
        message:"Role Updated Succesful",
        updateRole
    }

};

export const DeleteRole = async (ctx:Context) =>{
    const isDeleted = await deleteRole(ctx.params.id);
    if(isDeleted) {
        ctx.status = 200;
        ctx.body = {message:"Role deleted"}
        return;
    }

    ctx.status = 400
    ctx.body ={
        message:"Failed to Delete Role . Try again...."
    }
};         