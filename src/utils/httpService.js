import axios from "axios";

const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:5000",
});

httpService.interceptors.request.use((req) => {
  const token = localStorage.getItem("loginToken");
  if (!req.headers.Authorization && token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default httpService;
