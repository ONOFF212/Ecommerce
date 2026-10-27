
import * as  yup from "yup";

export const userSchema = yup.object({
    name:yup.string().max(20, {message:"User name should not be Longer than 20 characters"}).required(),
    email:yup.string().email().trim().lowercase().required(),
    password:yup.string().min(8, {message:"Password Must be at Least 8 Character Long"}).required(),
    confirmPassword:yup.string().oneOf([yup.ref('password')], 'Password must match').required()
});

export const loginSchema = yup.object({
    email:yup.string().email().trim().lowercase().required(),
    password:yup.string().min(8, {message:"Password Must be at Least 8 Character Long"}).required(),
});

type userSignup = yup.InferType<typeof userSchema>;
type userLogin = yup.InferType<typeof loginSchema>;


// export interface userSignupq{
//     name:string,
//     email:string, 
//     password:string,
//     roleId:number,
// }

// export interface userLogin{
//     email:string,
//     password:string,
// }


export interface userUpdate{
    name:string,
    email:string,
}

export interface saveUser{
    name:string,
    email:string, 
    hashed_password:string,
    roleId:number,
}

export interface userTokenGen{
    id:number,
    name:string,
    email:string, 
    role:{
        name:string
    },
}
