import api from "../api/axiosInstance";
export const authService = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  me: () => api.get("/auth/me"),
};
export const storeService = {
  list: (params) => api.get("/stores", { params }),
  mine: () => api.get("/stores/mine"),
  create: (payload) => api.post("/stores", payload),
  update: (id, payload) => api.put(`/stores/${id}`, payload),
  details: (id) => api.get(`/stores/${id}`),
};
export const productService = {
  list: (params) => api.get("/products", { params }),
  mine: () => api.get("/products/mine"),
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
};
export const orderService = {
  create: (payload) => api.post("/orders", payload),
  mine: () => api.get("/orders/mine"),
  owner: () => api.get("/orders/owner"),
  status: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};
export const adminService = {
  overview: () => api.get("/admin/overview"),
  stores: () => api.get("/admin/stores"),
  approve: (id, isApproved) =>
    api.patch(`/admin/stores/${id}/approval`, { isApproved }),
  users: () => api.get("/admin/users"),
  orders: () => api.get("/admin/orders"),
};
