import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthorization";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/inbox`;
const adminOptions = {
    headers: {
        'X-Admin': true
    }
}


export const useGetInboxMess = () => {
    const {request, isAdmin} = useAuth();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(isAdmin){
            request.get(baseUrl)
            .then(setMessages)
        }

    }, [])

    return {
        messages,
        updateOnSolved: (solvedMessId) => setMessages((state) => state.filter((message) => message._id !== solvedMessId))    
    }
}

export const useSolvedInboxMess = () => {
    const {request, isAdmin} = useAuth();
    
    
    const solvedMessage = (messageId) => {
        if(isAdmin){
            return request.delete(`${baseUrl}/${messageId}`,null, adminOptions)
        }
    }

    return {
        solvedMessage
    }
}

