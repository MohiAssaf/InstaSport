import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthorization";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/likes`;


export const useLikeCount = (postId) => {
    const {request} = useAuth()
    const [postLikes, setPostLikes] = useState(0);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `postId="${postId}" AND isLiked=true`, 
            count: true
        })

        request.get(`${baseUrl}?${searchParams.toString()}`)
        .then(setPostLikes)

    }, [postId])
    
    return {
        postLikes,
        addLike: () => setPostLikes(state => state + 1),
        removeLike: () => setPostLikes(state => Math.max(0, state - 1))
    }
}


export const useLikeStatus = (postId, userId) => {
    const {request} = useAuth()
    const [like, setLike] = useState(false);
    const [likeId, setLikeId] = useState(null);

    useEffect(() => {
        const getLikeStatus = async () =>  {
            const searchParams = new URLSearchParams({
                where: `_ownerId="${userId}" AND postId="${postId}"`, 
            })
    
            const [exisitngLike] = await request.get(`${baseUrl}?${searchParams.toString()}`)
            if(exisitngLike){
                setLike(exisitngLike.isLiked);
                setLikeId(exisitngLike._id)
            }
        }
        getLikeStatus()

    }, [postId, userId])

    const toggleLikeStatus = async() => {
        if(likeId){
            const updateLikeStatus = await request.patch(`${baseUrl}/${likeId}`, {isLiked: !like})
            setLike(updateLikeStatus.isLiked);
        }else{
            const newLike = await request.post(baseUrl, {postId, isLiked: true})
            setLike(newLike.isLiked)
            setLikeId(newLike._id)
        }
    }

    return {
        like,
        toggleLikeStatus
    }

}