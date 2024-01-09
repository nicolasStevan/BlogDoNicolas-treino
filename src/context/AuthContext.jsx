import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({children,value}){ // criar o contexto
    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
}

export function useAuthValue(){
    return useContext(authContext)
}