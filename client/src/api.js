import axios from "axios";

export const baseURL = "http://localhost:8000";

const baseApi = axios.create({
  baseURL,
  timeout: 7000,
});

// service     api hit point
// name        auth
export const registerApi = (data) => baseApi.post("/api/auth/register", data);
export const loginApi = (data) => baseApi.post("/api/auth/login", data);

// service     api hit point
// name        setting avatar
export const setAvatarApi = (id, data) =>
  baseApi.post(`/api/auth/setAvatar/${id}`, data);

// service     api hit point
// name        get all user
export const getAllUserApi = (currentUserId) =>
  baseApi.get(`/api/user/getalluser/${currentUserId}`);

// service     api hit point
// name        message
export const addMessageApi = (data) =>
  baseApi.post(`/api/message/addmessage`, data);
export const getMessagesApi = (data) =>
  baseApi.post(`/api/message/getmessages`, data);
