
import * as  yup from "yup";


export const userSchema = yup.object({
    email:yup.string().email().trim().lowercase().required().optional(),
    name:yup.string().required().optional(),
});

export type UserUpdate = yup.InferType<typeof userSchema>;

// export interface UserUpdate{
//     name:string,
//     email:string,
// }

export interface CreateUser{
    name:string,
    email:string, 
    password:string,
    roleId:number,
}