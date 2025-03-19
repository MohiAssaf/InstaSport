import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useAuthorization } from "../hooks/useAuthorization"
import requester from "../utils/requester"


const baseUrl = 'http://localhost:3030/users'

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
    const {request} = useAuthorization();
    const {removeAccessToken} = useAuth();
    const logout = () => {
        removeAccessToken()
        return request.get(baseUrl)
    }

    return {
        logout
    }
}

export const useUser = () => {
    const {request} = useAuthorization();
    const [user, setUser] = useState({})

    useEffect(() => {
        request.get(`${baseUrl}/me`)
        .then(setUser)
    }, [])


    return {
        user
    }
}