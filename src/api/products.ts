import { api } from "./api";

export const addProduct = async (data: object, token: string) => {
    const productData = await api.post('/product/new', data, { headers: { Authorization: `Bearer ${token}` } });

    return productData;
};

export const getAllProducts = async (token: string) => {
    const productData = await api.get('/products', { headers: { Authorization: `Bearer ${token}` } });

    return productData;
};

export const getProductById = async (id: string, token: string) => {
    const productData = await api.get(`/product/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    return productData;
};

export const getProductByOthers = async (data: string, token: string) => {
    const productData = await api.get(`/products/others/${data}`, { headers: { Authorization: `Bearer ${token}` } });

    return productData;
};

export const updateProduct= async (id: string, data: object, token: string) => {
    const productData = await api.put(`/product/update/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

    return productData;
};

export const deleteProduct = async (id: string | undefined, token: string) => {
    const productData = await api.delete(`/product/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    return productData;
};
