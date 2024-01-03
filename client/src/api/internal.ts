import axios from 'axios';
import { INTERNAL_API_PATH } from '../config';
const api = axios.create({
  baseURL: INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403 && error.response.data.message === 'RFTK') {
      console.log('Forbiden');
      try {
        const result = await axios.get('/auth/refresh-token', {
          baseURL: INTERNAL_API_PATH,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        window.localStorage.setItem('accessToken', result.data.token);
        error.config.headers.Authorization = `Bearer ${result.data.token}`;
        return api(error.config);
      } catch (refreshError) {
        // code here
        window.localStorage.removeItem('accessToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
