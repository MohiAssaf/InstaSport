import requester from "../utils/requester"
import { useAuthContext } from "../context/AuthContext"
import { useAuth } from "../hooks/useAuthorization"
import { useEffect, useState } from "react"


const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`

export const useLogin = () => {
    const login = (userData) => {
        return requester.post(`${baseUrl}/login`, userData)
    }
    return {
        login,
    }
}

export const useRegister = () => {
    const register = (userData) => {
        return requester.post(`${baseUrl}/register`, userData)
    }
    return {
        register
    }
}

export const useLogout = () => {
    const {request} = useAuth();
    const {userLogout} = useAuthContext();

    const logout = () => {
        userLogout()
        return request.get(baseUrl)
    }

    return {
        logout
    }
}

export const useUser = () => {
    const {request} = useAuth();
    const [user, setUser] = useState({})

    useEffect(() => {
        request.get(`${baseUrl}/me`)
        .then(setUser)
    }, [])


    return {
        user
    }
}