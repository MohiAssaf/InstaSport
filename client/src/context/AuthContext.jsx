import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("accessToken")
        if(storedUser){
            setIsAuthenticated(true)
            setToken(JSON.parse(storedUser))
        }else{
            setIsAuthenticated(false)
        }
    }, [])

    const setAccessToken = (userData) => {
        setToken(userData.accessToken)
        setIsAuthenticated(true)
        localStorage.setItem("accessToken", JSON.stringify(userData))
    }

    const removeAccessToken = () => {
        setToken(null);
        setIsAuthenticated(false)
        localStorage.removeItem("accessToken");
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, token, setAccessToken, removeAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}