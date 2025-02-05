import axiosInstance from "./axiosInstance";

const apiURL = "/User";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(apiURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${apiURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createUser = async (user: { name: string; email: string }) => {
  try {
    const response = await axiosInstance.post(apiURL, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id: string, user: { name?: string; email?: string }) => {
  try {
    const response = await axiosInstance.put(`${apiURL}/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${apiURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
