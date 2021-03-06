import axios from "axios";
import authHeader from "./header";

var api = axios.create();

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  api = axios.create({ baseURL: "http://localhost:5000" });
}

//user
export const register = (formData) => api.post("/user/register", formData);
export const login = (formData) =>
  api.post("/user/login", formData).then((resp) => {
    if (resp.data.token) {
      localStorage.setItem("profile", JSON.stringify(resp.data));
    }
    return resp.data;
  });
export const logout = () => {
  localStorage.removeItem("profile");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("profile"));
};

//general
export const fetchAllIngredients = () => api.get("/ingredient");

export const fetchAllFilters = (uid) => api.get("/filter",  { params: { userId: uid }});
export const addFilter = (formData) => api.post("/filter/add", formData).then((resp) => {
  return resp.data;
});
export const deleteFilter = (filterId) => api.delete(`/filter/delete/${filterId}`);
export const updateFilter = (data, filterId) => api.put(`/filter/update/${filterId}`, data);

export const fetchAllProducts = (uid) => api.get("/product",  { params: { userId: uid }});
export const addProduct = (formData) => api.post("/product/add", formData).then((resp) => {
  return resp.data;
});
export const deleteProduct = (productId) => api.delete(`/product/delete/${productId}`);
