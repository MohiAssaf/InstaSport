const baseUrl = 'http://localhost:3030/jsonstore/users'

export default {
    async getAllUsers(){
        const response = await fetch(baseUrl);
        const result = await response.json();
        return result
    },
    async createUser(userData){
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        const result = await response.json();
        return result;

    },
}