import axios from "axios";

let apiClient = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
);

// http://localhost:8080/api/v1/users/login
export let LoginApi = (userCredential) => apiClient.post(`/api/v1/users/login`, userCredential);
// http://localhost:8080/api/v1/social
export let LoginSocialApi = (userCredential) => apiClient.post(`/api/v1/social`, userCredential);
// http://localhost:8080/api/v1/users/signup
export let SignupApi = (userCredential) => apiClient.post(`/api/v1/users/signup`, userCredential);
// http://localhost:8080/api/v1/users
export let GetUserById = (id, headers) => apiClient.get(`/api/v1/users?userId=${id}`, { headers });
// http://localhost:8080/api/v1/users
export let UpdateUser = (userUpdateRequest, headers) => apiClient.put(`/api/v1/users`, userUpdateRequest, { headers });
// http://localhost:8080/api/v1/shops
export let CreateShopApi = (data, headers) => apiClient.post(`/api/v1/shops`, data, { headers });
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
export let CreateBookApi = (shopId, data, headers) =>
    apiClient.post(`/api/v1/books?shopId=${shopId}`, data, { headers });
// http://localhost:8080/api/v1/books/shop
export let GetBookForShopApi = (shopId, headers) => apiClient.get(`/api/v1/books/shop?shopId=${shopId}`, { headers });
// http://localhost:8080/api/v1/books
export let DeleteBookForShopApi = (bookId, headers) => apiClient.delete(`/api/v1/books?bookId=${bookId}`, { headers });
// http://localhost:8080/api/v1/books
export let GetBookByIdApi = (bookId, headers) => apiClient.get(`/api/v1/books?bookId=${bookId}`, { headers });
// http://localhost:8080/api/v1/books/details
export let GetBookDetailByIdApi = (bookId, headers) => apiClient.get(`/api/v1/books/details?bookId=${bookId}`, { headers });
// http://localhost:8080/api/v1/books
export let UpdateBookApi = (bookId, data, headers) => apiClient.put(`/api/v1/books?bookId=${bookId}`, data, { headers });
// http://localhost:8080/api/v1/books/pages
export let GetBookByPageApi = (page, headers) => apiClient.get(`/api/v1/books/pages?page=${page}`, { headers });
// http://localhost:8080/api/v1/users/reviews
export let CreateReviewApi = (data, headers) => apiClient.post(`/api/v1/users/reviews`, data, { headers });
// http://localhost:8080/api/v1/books/reviews/page
export let GetReviewApi = (bookId, page, headers) => apiClient.get(`/api/v1/books/reviews/page?bookId=${bookId}&page=${page}`, { headers });
// http://localhost:8080/api/v1/orders
export let CreateOrders = (data, headers) => apiClient.post(`/api/v1/orders`, data, { headers });
// http://localhost:8080/api/v1/users/orders
export let GetOrderForUserApi = (userId, headers) => apiClient.get(`/api/v1/users/orders?userId=${userId}`, { headers });
// http://localhost:8080/api/v1/shops/orders
export let GetOrderForShopApi = (shopId, data, headers) => apiClient.post(`/api/v1/shops/orders?shopId=${shopId}`, data, { headers });
// http://localhost:8080/api/v1/books/filter
export let GetBookByCondition = (data, headers) => apiClient.post(`/api/v1/books/filter`, data, { headers });
// http://localhost:8080/api/v1/orders/items
export let GetOrderItemsApi = (orderId, headers) => apiClient.get(`/api/v1/orders/items?orderId=${orderId}`, { headers });
// http://localhost:8080/api/v1/books/rates/count
export let GetRateApi = (bookId, headers) => apiClient.get(`/api/v1/books/rates/count?bookId=${bookId}`, { headers });
// http://localhost:8080/api/v1/orders
export let UpdateOrderApi = (orderId, orderStatus, data, headers) => apiClient.put(`/api/v1/orders?orderId=${orderId}&orderStatus=${orderStatus}`, data, { headers });













