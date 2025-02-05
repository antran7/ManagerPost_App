import axiosInstance from "./axiosInstance";

const apiURL = "/Post"

export const getAllPosts = async () => {
    try {
    const response = await axiosInstance.get(apiURL);
    return response.data;

    }catch(error) {
        console.error(e.toString());
        throw error;
    }
}

export const getPostById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.toString());
        throw error;
    }
}

export const createPost =async (post) => {
    try {
        const response = await axiosInstance.post(`${apiURL}`, post);
        return response.data;

    }catch(error) {
        console.error(e.toString());
        throw error;
    }
    
}

export const updatePost = async (id, post) => {
    try {
        const response = await axiosInstance.put(`${apiURL}/${id}`, post);
        return response.data;

    }catch(error) {
        console.error(e.toString());
        throw error;
    }
    
}

export const deletePost =async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${apiURL}/${id}`);
        return response.data;

    }catch(error) {
        console.error(e.toString());
        throw error;
    }
    
}