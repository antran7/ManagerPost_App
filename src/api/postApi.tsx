import axios from "axios";

const apiURL = "https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/Post"

export const getAllPosts = async () => {
    try {
    const response = await axios.get(apiURL)
    return response.data;

    }catch(e) {
        console.log(e.toString())
    }
}

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.toString());
    }
}

export const createPost =async (post) => {
    try {
        const response = await axios.post(`${apiURL}`, post)
        return response.data;

    }catch(e) {
        console.log(e.toString())
    }
    
}

export const updatePost = async (id, post) => {
    try {
        const response = await axios.put(`${apiURL}/${id}`, post)
        return response.data;

    }catch(e) {
        console.log(e.toString())
    }
    
}

export const deletePost =async (id) => {
    try {
        const response = await axios.delete(`${apiURL}/${id}`)
        return response.data;

    }catch(e) {
        console.log(e.toString())
    }
    
}