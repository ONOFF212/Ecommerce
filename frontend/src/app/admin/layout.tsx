
import "./adminStyle.css";
import { ReactNode } from "react";

import AdminHeader from "@/components/admin/adminHeader";
import { AdminSideBar } from "@/components/admin/adminSidebar";
import { AdminFooter } from "@/components/admin/adminFooter";

import AuthGuard from "@/contexts/authContext/authGuard";
import { AuthProvider } from "@/contexts/authContext/authContext";

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