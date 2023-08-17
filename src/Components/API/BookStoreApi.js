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
export let GetUserById = (id, headers) => apiClient.get(`/api/v1/users?id=${id}`, { headers });





