import requester from "../utils/requester";

const baseUrl = 'http://localhost:3030/jsonstore/users'

export default {
    async getAllUsers(){
        return requester.get(baseUrl)
    },
    async createUser(userData){
        return requester.post(userData)
    },
}