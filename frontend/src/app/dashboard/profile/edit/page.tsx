
"use client"
import "../../dashboardStyle.css";
import { updateSchema, updateInput }  from "@/utils/formTypeCheck";
import { zodResolver } from "@hookform/resolvers/zod";
4
import { useRouter } from "next/navigation";
import {useForm} from 'react-hook-form';
import { updateUser } from "@/app/api/authApi/auth";
export default  function RegisterPage() {
    const router = useRouter();

    const { register, handleSubmit ,formState: { errors }, }= useForm<updateInput>({
        resolver:zodResolver(updateSchema),
        defaultValues:{
            role:"",
            name:"",
            email:"",
            password:"",
        }
    });

    const onSubmit = async (data : updateInput) => {
        try {
            await updateUser(data);
            router.push("/dashboard/profile");

        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    function handleCancle() {
        router.push('/dashboard/profile');
    };
    
    return(
        <div className="edit-profile">
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-bold text-center text-2xl mt-4">Edit Profile</h1>
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
                    <select  {...register("role")} id="role" >
                        <option value="">--Select Role--</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && (
                        <p className="text-red-500 text-sm font-semibold">
                            {errors.role.message}
                        </p>
                    )}
                </div> 
                <div>
                    <button type="submit" className="edit-btne">Save Changes</button>
                    <button type="button" className="edit-btnc" onClick={handleCancle}>Cancel</button>
                </div> 
            </form>
            </div>
        </div>
    );
};