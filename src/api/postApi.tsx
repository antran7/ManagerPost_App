import axiosInstance from "./axiosInstance";

const apiURL = "/Post"

export const getAllPosts = async () => {
    try {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            throw new Error("You are not allowed to do this.");
        }
        const response = await axiosInstance.get(apiURL);
        return response.data;

    } catch (error) {
        console.error(error.toString());
        throw error;
    }
}

export const getPostsByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`${apiURL}?status=${status}`);
        return response.data;
    } catch (error) {
        console.error(error.toString());
        throw error;
    }
};

export const getPostById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.toString());
        throw error;
    }
}

export const createPost = async (post) => {
    try {
        const response = await axiosInstance.post(`${apiURL}`, post);
        return response.data;

    } catch (error) {
        console.error(e.toString());
        throw error;
    }

}

export const updatePost = async (id, post) => {
    try {
        const response = await axiosInstance.put(`${apiURL}/${id}`, post);
        return response.data;

    } catch (error) {
        console.error(e.toString());
        throw error;
    }

}

export const deletePost = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`${apiURL}/${id}`);
        return response.data;

    } catch (error) {
        console.error(e.toString());
        throw error;
    }

}

export const approvePost = async (id: string) => {
    try {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            throw new Error("Only admins can approve posts.");
        }
        const response = await axiosInstance.put(`${apiURL}/approve/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.toString());
        throw error;
    }
};

export const rejectPost = async (id: string) => {
    try {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            throw new Error("Only admins can reject posts.");
        }
        const response = await axiosInstance.put(`${apiURL}/reject/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.toString());
        throw error;
    }
};