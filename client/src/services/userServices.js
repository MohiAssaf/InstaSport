import requester from "../utils/requester";

const baseUrl = 'http://localhost:3030/jsonstore/users'

export default {
    async getAllUsers(){
        return requester.get(baseUrl)
    },
    async getOne(id){
        return requester.get(`${baseUrl}/${id}`)
    },
    async create(userData){
        return requester.post(baseUrl, userData)
    },
    async update(userData, id){
        return requester.put(`${baseUrl}/${id}`, userData)
    },
}