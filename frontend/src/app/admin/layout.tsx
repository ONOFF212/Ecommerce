
import "./admin-style.css";
import { ReactNode } from "react";

import AdminHeader from "@/features/admin/components/AdminHeader";
import { AdminSideBar } from "@/features/admin/components/AdminSidebar";
import { AdminFooter } from "@/features/admin/components/AdminFooter";

import AuthGuard from "@/contexts/auth/AuthGuard";
import { AuthProvider } from "@/contexts/auth/AuthContext";

export default function AdminLayout({children}:{children : ReactNode}){
    return(
        <AuthProvider>
            <AuthGuard>
                <div className="admin-layout">
                    <div className="admin-header">
                        <div>
                            <AdminHeader />
                        </div>
                    </div>

                    <div className="admin-sidebar">
                        <AdminSideBar />
                    </div>

                    <div className="admin-main">
                        {children}
                    </div>

                    <div className="admin-footer">
                        <AdminFooter />
                    </div>
                </div>
            </AuthGuard>
        </AuthProvider>
    );
};