import axios from 'axios';
import { INTERNAL_API_PATH } from '../config';
const api = axios.create({
    baseURL: INTERNAL_API_PATH,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
);

export default api;
