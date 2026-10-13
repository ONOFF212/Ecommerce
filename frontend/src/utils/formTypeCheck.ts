
import {z} from 'zod';

export const signupSchema = z.object ({
    role:z
    .string()
    .min(1, {message:"Select a role"}),

    name:z
    .string()
    .min(1, {message:"User name is required"})
    .min(4, {message:'User name must be at least 4 character long'})
    .max(20, {message:'User name should not be long more than 20 character long'})
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' }),

    email:z.
    string()
    .min(1,{message:"Email is required"})
    .email({message:"Invalid Email Address"})
    .trim()
    .toLowerCase(),

    password:z
    .string()
    .min(8, {message:"Password must be at least 8 character long"})
    .max(100, {message:"Password is too long"})
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
    
})
.refine((data) => data.password === data.confirmPassword, {
    message:"Passwords do not match",
    path:['confirmPassword'],
});

export const loginSchema = z.object ({

    email:z.
    string()
    .min(1,{message:"Email is required"})
    .email({message:"Invalid Email Address"})
    .trim()
    .toLowerCase(),

    password:z
    .string()
    .min(1, {message:"Password is required"})
});

export const updateSchema = z.object ({
    role:z
    .string()
    .min(1, {message:"Select a role"}),

    name:z
    .string()
    .min(1, {message:"User name is required"})
    .min(4, {message:'User name must be at least 4 character long'})
    .max(20, {message:'User name should not be long more than 20 character long'})
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' }),

    email:z.
    string()
    .min(1,{message:"Email is required"})
    .email({message:"Invalid Email Address"})
    .trim()
    .toLowerCase(),

    password:z
    .string()
    .min(8, {message:"Password must be at least 8 character long"})
    .max(100, {message:"Password is too long"})
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Must contain at least one special character' }),
})

export type signupInput = z.infer<typeof signupSchema>;
export type loginInput = z.infer<typeof loginSchema>;
export type updateInput = z.infer<typeof updateSchema>;