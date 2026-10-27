
"use client"
import { useEffect, type ReactNode } from "react";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";

export default function AuthGuard({children}:{children:ReactNode}) {
    const {isAuthenticated, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !isAuthenticated) {
            router.push("/auth/login");
        }
    }, [loading, isAuthenticated, router]);
    return <>{children}</>;
};