import axios from "axios";
import toast from "react-hot-toast";
import { store } from "../redux";
import { setLoggin } from "../redux/slices/auth";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`,
});

// Dynamically attach auth token before each request
API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth-key");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired");
      store.dispatch(setLoggin(null));
    } else {
      const message =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default API;
