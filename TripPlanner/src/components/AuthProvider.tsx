import {createContext, useContext, useState, useEffect, type ReactNode } from "react";
import LoadingPage from "./pages/LoadingPage";

export interface User{
    id: number;
    email: string;
    username: string;
}

interface AuthContextType{
    user: User | null;
    setUser: (user: User | null) => void;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));

    const login = (newToken: string) => {
        sessionStorage.setItem("token", newToken);
        setToken(newToken); //trigger re-render
    }

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("token");
        setToken(null);
    };

    useEffect(() => {
        async function checkAuth() {
            const token = sessionStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/user", {
                    headers: {"Authorization": `Bearer ${token}`}
                });
            
                if (response.ok) {
                    const userData = await response.json()
                    setUser(userData);
                }
                else {
                    sessionStorage.removeItem("token");
                }
            }
            catch (error) {
                console.error("Auth failed", error);
            }
            finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []
);

    if (loading) {
        return <LoadingPage />
    }

    return(
        <AuthContext.Provider value ={{user, setUser, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook
export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth needs to be utilized within AuthProvider");
    }

    return context;
}