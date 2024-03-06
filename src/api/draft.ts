import { api } from "./api";

export const createDraft = async (data: object, token: string) => {
    const draftData = await api.post('/draft', data, { headers: { Authorization: `Bearer ${token}` } });

    return draftData;
};

export const getDraft = async () => {
    const draftData = await api.get('/draft');

    return draftData;
};

export const getDraftById = async (id: string) => {
    const draftData = await api.get(`/draft/${id}`);

    return draftData;
};

export const updateDraft = async (id: string, data: object, token: string) => {
    const draftData = await api.put(`/draft/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

    return draftData;
};

export const deleteDraft = async (id: string | undefined, token: string) => {
    const draftData = await api.delete(`/draft/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    return draftData;
};
