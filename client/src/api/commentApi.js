import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthorization";

const baseUrl = 'http://localhost:3030/data/comments/';



export const useComments = (post_Id) => {
    const {request} = useAuth();
    const [comments, setComments] = useState([]);


    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `postId="${post_Id}"`,
            load: `author=_ownerId:users`,
        })

        request.get(`${baseUrl}?${searchParams.toString()}`)
        .then(setComments)
    }, [post_Id])
    
    return {
        comments,
        addComment: (newComment) => setComments(state => [...state, newComment])
    }
}




export const useCreateComment = () => {
    const {request} = useAuth()
    const create = (content, postId) => {
        return request.post(baseUrl, {content, postId})
    }

    return {
        create
    }
}