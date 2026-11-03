
import * as  yup from "yup";

export const userSignupSchema = yup.object({
    name:yup.string().max(20, {message:"User name should not be Longer than 20 characters"}).required(),
    email:yup.string().email().trim().lowercase().required(),
    password:yup.string().min(8, {message:"Password Must be at Least 8 Character Long"}).required(),
    confirmPassword:yup.string().oneOf([yup.ref('password')], 'Password must match').required()
});

export const loginSchema = yup.object({
    email:yup.string().email().trim().lowercase().required(),
    password:yup.string().min(8, {message:"Password Must be at Least 8 Character Long"}).required(),
});

type UserSignup = yup.InferType<typeof userSignupSchema>;
type UserLogin = yup.InferType<typeof loginSchema>;


export interface UserTokenPayload{
    id:number,
    name:string,
    email:string, 
    role:{
        name:string
    },
}
