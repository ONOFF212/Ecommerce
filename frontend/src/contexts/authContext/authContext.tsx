
"use client"
import { useRouter } from "next/navigation";
import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    type ReactNode 
} from "react";

type User = {
    id:string;
    name?:string;
    email?:string;
    roles?: {name: string} | { name: string };
}

type authContextType = {
    user:User | null;
    token:string | null;
    loading:boolean;
    login:(user:User, token:string) => void;
    logout:() => void;
    isAuthenticated:boolean;
}

const authContext = createContext<authContextType | undefined>(undefined);

export function AuthProvider({children}:{children:ReactNode}) {
    const router = useRouter();
    const [user, setUser]  = useState<User | null>(null);
    const [token, setToken]  = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try{
            const savedUser = localStorage.getItem("Current user");
            const savedToken = localStorage.getItem("Bearer");
            if(savedUser && savedToken) {
                setUser(JSON.parse(savedUser) as User);
                setToken(savedToken);
            }else{
                setLoading(false);
            }
        }catch{
            localStorage.removeItem("Current user");
            localStorage.removeItem("Bearer");
        }
    }, []);

    const login = (user:User, token:string) => {
        localStorage.setItem("Current user", JSON.stringify(user));
        localStorage.setItem("Bearer", token);
        setUser(user);
        setToken(token);
    };

    const logout= () => {
        localStorage.removeItem('Current user')
        localStorage.removeItem('Bearer');
        setUser(null);
        setToken(null);
        router.push("/auth/login");
    };


    return (
        <authContext.Provider 
        value={{user, 
            token, 
            loading,
            login,
            logout,
            isAuthenticated:Boolean(user && token),  
            }}>
                {children}
            </authContext.Provider>
    );
};

export function useAuth(){
    const contexts = useContext(authContext);
    if(!contexts) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return contexts;
}