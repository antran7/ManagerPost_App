import axios from "axios"

const apiURL = "https://67a1b9be5bcfff4fabe339d0.mockapi.io/api/User"

export const getAllUsers = async () => {
    try {
    const response = await axios.get(apiURL)
    return response.data;

    }catch(e) {
        console.log(e.toString())
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.toString());
    }
}

export const createUser =async (user) => {
    try {
        const response = await axios.post(`${apiURL}`, user)
        return response.data;

    }catch(e) {
        console.log(e.toString())
    }
    
}

export const updateUser =async (id, user) => {
    try {
        const response = await axios.put(`${apiURL}/${id}`, user)
        return response.data;

    }catch(e) {
        console.log(e.toString())
    }
    
}

export const deleteUser =async (id) => {
    try {
        const response = await axios.delete(`${apiURL}/${id}`)
        return response.data;

    }catch(e) {
        console.log(e.toString())
    }
    
}