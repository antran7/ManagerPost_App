import axiosInstance from "./axiosInstance";

interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  createDate: string;
  updateDate: string;
}

const apiURL = "/Post"; // Endpoint đúng theo axiosInstance

export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get(apiURL);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
    }
    throw error;
  }
};

export const getPostsByStatus = async (status: string) => {
  try {
    const response = await axiosInstance.get(`${apiURL}?status=${status}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
    }
    throw error;
  }
};

export const createPost = async (post: Partial<Post>) => {
  try {
    const response = await axiosInstance.post(apiURL, post);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
    }
    throw error;
  }
};

export const updatePost = async (id: string, post: Partial<Post>) => {
  try {
    const response = await axiosInstance.put(`${apiURL}/${id}`, post);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
    }
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    await axiosInstance.delete(`${apiURL}/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
    }
    throw error;
  }
};

export const approvePost = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${apiURL}/${id}`);
    const existingPost = response.data;

    const response2 = await axiosInstance.put(`${apiURL}/${id}`, {
      ...existingPost,
      status: "approved",
    });
    return response2.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
    }
    throw error;
  }
};

export const rejectPost = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${apiURL}/${id}`);
    const existingPost = response.data;

    const response2 = await axiosInstance.put(`${apiURL}/${id}`, {
      ...existingPost,
      status: "rejected",
    });
    return response2.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.toString());
    }
    throw error;
  }
};
