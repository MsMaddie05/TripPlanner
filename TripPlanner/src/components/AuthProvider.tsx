import {createContext, useContext, useState, type ReactNode } from "react";

export interface User{
    id: number;
    email: string;
    username: string;
}

interface AuthContextType{
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        setUser(null);
        //deal w token later
    };

    return(
        <AuthContext.Provider value ={{user, setUser, logout}}>
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