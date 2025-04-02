const requester = async (method, url, data, options={}) => {
    if(method != "GET"){
        options.method = method
    }

    if(data) {
        options = {
            ...options,
            headers : {
                "Content-Type": "application/json",
                ...options.headers
            },
            body: JSON.stringify(data)
        }
    }

    try {
        const response = await fetch(url, options);
    
        if (!response.ok) {
            if (response.status === 403) {
                throw new Error("Email or password don't match");
            }
            if (response.status === 409) {
                throw new Error("A user with this email already exists");
            }
        }
    
        if (!response.headers.get("Content-Type")) {
            return;
        }
    
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong, please try again later');
    }
    


}

export default {
    get: requester.bind(null, "GET"),
    put: requester.bind(null, "PUT"),
    post: requester.bind(null, "POST"),
    delete: requester.bind(null, "DELETE"),
    baseRequest: requester
}