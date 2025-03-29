import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthorization";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/inbox`;


export const useGetInboxMess = (postId) => {
    const {request, isAdmin} = useAuth();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(isAdmin){
            request.get(baseUrl)
            .then(setMessages)
        }

    }, [])

    return {
        messages
    }
}
