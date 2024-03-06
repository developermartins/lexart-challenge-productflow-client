import { api } from "./api";

export const createPortfolioPost = async (data: object, token: string) => {
    const postData = await api.post('/portfolio', data, { headers: { Authorization: `Bearer ${token}` } });

    return postData;
};

export const getPortfolioPost = async () => {
    const postData = await api.get('/portfolio');

    return postData;
};

export const getPortfolioPostById = async (id: string) => {
    const postData = await api.get(`/portfolio/${id}`);

    return postData;
};

export const updateProject = async (id: string, data: object, token: string) => {
    const projectData = await api.put(`/portfolio/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

    return projectData;
};

export const deletePortfolioPost = async (id: string | undefined, token: string) => {
    const postData = await api.delete(`/portfolio/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    return postData;
};
