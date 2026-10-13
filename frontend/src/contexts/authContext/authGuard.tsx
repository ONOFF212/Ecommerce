
"use client"
import { useEffect, type ReactNode } from "react";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";

export default function AuthGuard({children}:{children:ReactNode}) {
    const {isAuthenticated} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isAuthenticated) {
            router.push("/auth/login");
        }
    });
    return <>{children}</>;
};