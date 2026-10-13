
import type { ReactNode } from "react";


export default function AuthLayout({ children,}:{children:ReactNode}) {
  return (
    <div>
      
      <div className="Auth-Container">
        <main>
          {children}
        </main>
    </div>
    </div>
  );
}