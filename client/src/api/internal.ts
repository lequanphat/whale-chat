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
    async (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
            console.log('Forbiden or UnAuthenticated');
            try {
                await axios.get('/auth/refresh-token', {
                    baseURL: INTERNAL_API_PATH,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return api(error.config);
            } catch (refreshError) {
                // Xử lý khi refresh token thất bại
                return Promise.reject(refreshError);
            }
        }
        Promise.reject((error.response && error.response.data) || 'Something went wrong');
    },
);

export default api;
