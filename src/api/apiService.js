import api from "./axiosInstance";
export const getStores = (params = {}) => api.get("/stores", { params });
export const getStore = (id) => api.get(`/stores/${id}`);
export const getProducts = (params = {}) => api.get("/products", { params });
export const createOrder = (payload) => api.post("/orders", payload);
export const getMyOrders = () => api.get("/orders/mine");
