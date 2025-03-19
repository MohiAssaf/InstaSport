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

    const response = await fetch(url, options);
    if(!response.headers.get("Content-Type")){
        return
    }
    const result = await response.json();

    return result

}

export default {
    get: requester.bind(null, "GET"),
    put: requester.bind(null, "PUT"),
    post: requester.bind(null, "POST"),
    delete: requester.bind(null, "DELETE"),
    baseRequest: requester
}