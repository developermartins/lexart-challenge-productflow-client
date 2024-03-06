import { api } from "./api";

export const login = async (data: any) => {

    const res = await api.post('/login', data);

    return res;
};

export const registerUser = async (data: any) => {

    const res = await api.post('/register', data);

    return res;
};
