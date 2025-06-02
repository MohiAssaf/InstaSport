import { useEffect, useState } from "react";
import requester from "../utils/requester";
import { useAuth } from "../hooks/useAuthorization";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/posts`;


export const usePosts = () => {
    const {request} = useAuth()
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        request.get(baseUrl)
        .then(setPosts)
    }, [])

    return {
        posts
    }
}

export const usePost = (postId) => {
    const [post, setPost] = useState({});

    useEffect(() => {
        if (!postId) return;
        requester.get(`${baseUrl}/${postId}`)
        .then(setPost)
    }, [postId])

    return {
        post
    }
}


export const useMyPosts = (userId) => {
    const {request} = useAuth();
    const [myPosts, setMyPosts] = useState([]);


    useEffect(() => {
        if (!userId) return;
    
        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`, 
            load: `author=_ownerId:users`, 
        });
    
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(setMyPosts)  
    }, [userId]);

    
    return {
        myPosts
    }
}

export const useCreatePost = () => {
    const {request} = useAuth()

    const createPost = (postData) => {
        return request.post(baseUrl, postData)
    }

    return {
        createPost
    }
}

export const useEditPost = () => {
    const {request} = useAuth()

    const edit = (postId, postData) => {
        return request.put(`${baseUrl}/${postId}`, {...postData, _id: postId})
    }

    return {
        edit
    }
}


export const useDeletePost = () => {
    const {request} = useAuth()

    const delPost = (postId) => {
        return request.delete(`${baseUrl}/${postId}`)
    }

    return {
        delPost
    }
}