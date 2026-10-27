
import type { ReactNode } from "react";
import { AuthProvider } from "@/contexts/authContext/authContext";


export default function AuthLayout({ children,}:{children:ReactNode}) {
  return (
    <div>
      
      <div className="Auth-Container">
        <main>
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>
    </div>
    </div>
  );
}