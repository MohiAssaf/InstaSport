import requester from "../utils/requester";

const baseUrl = 'http://localhost:3030/jsonstore/users'

export default {
    async getAllUsers(){
        return requester.get(baseUrl)
    },
    async getOne(id){
        return requester.get(`${baseUrl}/${id}`)
    },
    async createUser(userData){
        console.log(userData)
        return requester.post(baseUrl, userData)
    },
}