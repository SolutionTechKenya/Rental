import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    // baseURL : 'http://127.0.0.1:5001',
    baseURL : 'http://192.168.2.177:8000',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api; 