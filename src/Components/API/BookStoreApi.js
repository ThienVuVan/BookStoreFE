import axios from "axios";

let apiClient = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
);

// http://localhost:8080/api/v1/users/login
export let LoginApi = (userCredential) => apiClient.post(`/api/v1/users/login`, userCredential);
// http://localhost:8080/api/v1/users/signup
export let SignupApi = (userCredential) => apiClient.post(`/api/v1/users/signup`, userCredential);
// http://localhost:8080/api/v1/users
export let GetUserById = (id, headers) => apiClient.get(`/api/v1/users?userId=${id}`, { headers });
// http://localhost:8080/api/v1/users
export let UpdateUser = (userUpdateRequest, headers) => apiClient.put(`/api/v1/users`, userUpdateRequest, { headers });
// http://localhost:8080/api/v1/shops
export let CreateShopApi = (shopRequest, headers) => apiClient.post(`/api/v1/shops`, shopRequest, { headers });
// http://localhost:8080/api/v1/shops
export let GetShopApi = (userId, headers) => apiClient.get(`/api/v1/shops?userId=${userId}`, { headers });
// http://localhost:8080/api/v1/shops
export let UpdateShopApi = (shopRequest, headers) => apiClient.put(`/api/v1/shops`, shopRequest, { headers });
// http://localhost:8080/api/v1/shops
export let DeleteShopApi = (userId, shopId, headers) => apiClient.delete(`/api/v1/shops?userId=${userId}&shopId=${shopId}`, { headers });
// http://localhost:8080/api/v1/shops/details
export let GetShopDetailApi = (shopId, headers) => apiClient.get(`/api/v1/shops/details?shopId=${shopId}`, { headers });
// http://localhost:8080/api/v1/shops/details
export let UpdateShopDetailApi = (shopId, shopDetailsUpdateRequest, headers) => apiClient.put(`/api/v1/shops/details?shopId=${shopId}`, shopDetailsUpdateRequest, { headers });
// http://localhost:8080/api/v1/books
export let CreateBookApi = (shopId, bookRequest, bookDetailsRequest, listAuthor, listCategory, listImage, headers) =>
    apiClient.post(`/api/v1/books?shopId=${shopId}`, bookRequest, bookDetailsRequest, listAuthor, listCategory, listImage, { headers });










