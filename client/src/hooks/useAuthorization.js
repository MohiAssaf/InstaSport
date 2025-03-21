import { useAuthContext } from "../context/AuthContext"
import requester from "../utils/requester"


export const useAuth = () => {
    const userData = useAuthContext()

    const requestWrapper = (method, url, data, options={}) => {

        const authOptions = {
            ...options,
            headers:{
                "X-Authorization": userData.token,
                ...options.headers
            }
        }

        return requester.baseRequest(method, url, data, userData ? authOptions : options)
    }

    return {
        user_id: userData.user_id,
        isAuthenticated: !!userData.token,
        request: {
        get: requestWrapper.bind(null, "GET"),
        put: requestWrapper.bind(null, "PUT"),
        post: requestWrapper.bind(null, "POST"),
        delete: requestWrapper.bind(null, "DELETE")
    }}
}