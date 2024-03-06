import { api } from "./api";

export const createBlogPost = async (data: object, token: string) => {
    const postData = await api.post('/posts', data, { headers: { Authorization: `Bearer ${token}` } });

    return postData;
};

export const getBlogPost = async () => {
    const postData = await api.get('/posts');

    return postData;
};

export const getBlogPostById = async (id: string) => {
    const postData = await api.get(`/posts/${id}`);

    return postData;
};

export const updateBlogPost = async (id: string, data: object, token: string) => {
    const postData = await api.put(`/posts/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

    return postData;
};

export const deleteBlogPost = async (id: string | undefined, token: string) => {
    const postData = await api.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    return postData;
};
