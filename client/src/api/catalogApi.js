import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthorization";

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

export const useCreatePost = () => {
    const {request} = useAuth()

    const createPost = (postData) => {
        return request.post(baseUrl, {...postData, likesCount: 0, commentsCount: 0})
    }

    return {
        createPost
    }
}