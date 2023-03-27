import axios from 'axios';
import { authStore } from '@/stores/authStore'

const authstore = authStore();

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authstore.getToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;