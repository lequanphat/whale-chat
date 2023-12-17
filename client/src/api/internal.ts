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
    (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
            console.log('Forbiden or UnAuthenticated');
        }
        Promise.reject((error.response && error.response.data) || 'Something went wrong');
    },
);

export default api;
