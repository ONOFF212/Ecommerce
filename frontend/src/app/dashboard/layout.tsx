
import type { ReactNode } from "react";
import { AuthProvider } from "@/contexts/authContext/authContext";
//import AuthGuard from "@/contexts/authContext/authGuard";

export default function DashboardLayout({children,}:{children:ReactNode}){
    return(
        <>
        <AuthProvider>
            {/* <AuthGuard>
                {children}
            </AuthGuard> */}
            {children}
        </AuthProvider>
        </>
    );
};
