import { api } from "./api";

export const login = async (data: any) => {

    console.log(data)

    const res = await api.post('/login', data);

    return res;
};

export const forgotPassword = async (data: string) => {
    const res = await api.post('/forgot_password', data);

    return res;
};

export const resetPassword = async (data: object) => {
    const res = await api.put('/reset_password', data);

    return res;
};

export const updateEmail = async (id: string, data: object, token: string) => {
    const res = await api.put(`/user/update/email/${ id }`, data, { headers: { Authorization: `Bearer ${token}` } });

    return res;
};

export const updateUsername = async (id: string, data: object, token: string) => {
    const res = await api.put(`/user/update/username/${ id }`, data, { headers: { Authorization: `Bearer ${token}` } });

    return res;
};

export const updatePassword = async (id: string, data: object, token: string) => {
    const res = await api.put(`/user/update/password/${ id }`, data, { headers: { Authorization: `Bearer ${token}` } });

    return res;
};
