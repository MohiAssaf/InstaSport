import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuthorization"

const baseUrl = 'http://localhost:3030/users'

export const useUser = () => {
    const {request} = useAuth()
    const [user, setUser] = useState({})

    useEffect(() => {
        request.get(`${baseUrl}/me`)
        .then(setUser)
    }, [])


    return {
        user
    }
}


export const useUpdateUser = () => {
    const {request} = useAuth();

    const updateUser = (userData) => {
        try {
            return request.put(`${baseUrl}/me`,userData);
        } catch (error) {
            return {error: error.message}
        }
    }

    return {
        updateUser
    }
}