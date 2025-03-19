import { useAuth } from "../context/AuthContext"
import requester from "../utils/requester"


export const useAuthorization = () => {
    const {token} = useAuth();

    const requestWrapper = (method, url, data, options={}) => {

        const authOptions = {
            ...options,
            headers:{
                "X-Authorization": token,
                ...options.headers
            }
        }

        return requester.baseRequest(method, url, data, token ? authOptions : options)
    }

    return {request: {
        get: requestWrapper.bind(null, "GET"),
        put: requestWrapper.bind(null, "PUT"),
        post: requestWrapper.bind(null, "POST"),
        delete: requestWrapper.bind(null, "DELETE")
    }}
}