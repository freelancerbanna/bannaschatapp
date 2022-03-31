import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 7000,
});

// service     api hit point
// name        auth
export const registerApi = (data) => baseApi.post("/auth/register", data);
export const loginApi = (data) => baseApi.post("/auth/login", data);
