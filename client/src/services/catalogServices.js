import requester from "../utils/requester"

const baseUrl = "http://localhost:3030/jsonstore/posts"

export default {
    async getAll(){
        return requester.get(baseUrl)
    },
    async create(postData, user_id){
        let data = {
            ...postData,
            author_id: user_id,
            likesCount: 0,
            commentsCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()

        }
        return requester.post(baseUrl, data)
    }
}