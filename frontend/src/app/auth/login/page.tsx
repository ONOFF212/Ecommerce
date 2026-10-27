
"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginInput } from "@/utils/formTypeCheck";
import Link from "next/link";
import '../authStyle.css'
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/api/authApi/auth";
import { useAuth } from "@/contexts/authContext/authContext";

export default function LoginPage() {
    const {login} = useAuth();
    const router = useRouter();
    const {register, handleSubmit, formState: { errors },} = useForm<loginInput>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:""
        },
    });

    const onSubmit = async(data:loginInput) =>{
        try {
            const result = await loginUser(data);
            
            if(result.user && result.Token){
                login(result.user , result.Token);
                if (result && result.user.roles.name === 'customer') {
                    router.push("/dashboard");
                }else if(result && result.user.roles.name === 'admin'){
                    router.push("/admin");
                }else{
                    router.push('/auth/signup');
                }
            }
            
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return(
        <div className="form-container">
            
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="font-bold text-center text-2xl mt-4">Log In</h1>
                    <div>
                        <label>E-mail</label>
                        <input type="email"
                        placeholder="example123@gmail.com"
                        {...register("email", {required:true})}/>
                        {errors.email && (
                            <p className="text-red-500 text-sm font-semibold">
                            {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"
                        placeholder="#123DSrtEUri@"
                        {...register("password", {required:true})}></input>
                        {errors.password && (
                            <p className="text-red-500 text-sm font-semibold">
                            {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                    <div className="text-center font-semibold">
                        <p>Don't have an account?
                        <Link href="/auth/register" className="text-blue-400 transition:0.5"> Register</Link>
                        </p>
                    </div>
                    <div className="text-center font-semibold mt-4 text-sm">
                        <Link href="/auth/forget" className="text-blue-400 text-underline"> Forget Password!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};