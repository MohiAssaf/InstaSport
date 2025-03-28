import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthorization";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/comments/`;



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
        addComment: (newComment) => setComments(state => [...state, newComment]),
        editCommnet: (id, updatedComment) => setComments(state => state.map(comment => comment._id === id? updatedComment: comment)),
        deleteComment: (id) => setComments(state => state.filter(comment => comment._id !== id))
    }
}

export const useMyComments = (userId) => {
    const {request} = useAuth();
    const [myComments, setMyComments] = useState(0);


    useEffect(() => {
        if (!userId) return;
    
        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`, 
            count: true
        });
    
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setMyComments)  
    }, [userId]);

    
    return {
        myComments
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


export const useEditComment = () => {
    const {request} = useAuth();

    const edit = (id, updatedComment) => {
        return request.put(`${baseUrl}/${id}`, updatedComment);
    }

    return {
        edit,
    }
}

export const useDeleteComment = () => {
    const {request} = useAuth();

    const options = {
        headers: {
            'X-Admin': true
        }
    }

    const delComment = (commentId) => {
        return request.delete(`${baseUrl}/${commentId}`, null, options)
    }

    return {
        delComment
    }
}