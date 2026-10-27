
"use client"
import { signupSchema, signupInput }  from "@/utils/formTypeCheck";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import "../authStyle.css";

import { useRouter } from "next/navigation";
import {useForm} from 'react-hook-form';
import { signupUser } from "@/app/api/authApi/auth";
export default  function RegisterPage() {
    const router = useRouter();

    const { register, handleSubmit ,formState: { errors }, }= useForm<signupInput>({
        resolver:zodResolver(signupSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    });

    const onSubmit = async (data : signupInput) => {
        try {
            const result = await signupUser(data);

            if (result && result.user) {
                router.push("/dashboard");
            }

        } catch (error) {
            console.error("Registration failed:", error);
        }
    };
    
    return(
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-bold text-center text-2xl mt-4">Sign Up</h1>
                <div>
                    <label htmlFor="name">Username</label>
                    <input 
                        id="name" 
                        type="text" 
                        placeholder="user name"
                        {...register("name",{required:true})}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm font-bold">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        id="email" 
                        type="email" 
                        placeholder="example123@gmail.com"
                        {...register("email",{required:true})}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm font-semibold">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        type="password" 
                        placeholder="#123DSrtEUri@"
                        {...register("password" ,{required:true})} 
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm font-semibold">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="confirmPassword">confirm-password</label>
                    <input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="#123DSrtEUri"
                        {...register("confirmPassword",{required:true})}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm font-semibold">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <div>
                    <button type="submit">Register</button>
                </div> 
                <div className="text-center font-semibold">
                    <p>Already have an Account?
                    <Link href="/auth/login" className="text-blue-400 font-bold"> Log In</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};