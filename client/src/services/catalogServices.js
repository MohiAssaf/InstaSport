const baseUrl = "http://localhost:3030/jsonstore/posts"

export default {
    async getAll(){
        const response = await fetch(baseUrl);
        const result = await response.json();

        return result
    }
}