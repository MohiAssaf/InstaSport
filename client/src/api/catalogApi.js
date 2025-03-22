import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthorization";
import requester from "../utils/requester";

const baseUrl = 'http://localhost:3030/data/posts';

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
        requester.get(`${baseUrl}/${postId}`)
        .then(setPost)
    }, [])

    return {
        post
    }
}

export const useCreatePost = () => {
    const {request} = useAuth()

    const createPost = (postData) => {
        return request.post(baseUrl, {...postData})
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