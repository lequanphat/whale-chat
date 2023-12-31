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
    if (error.response.status === 403 && error.response.data.message === 'RFTK') {
      console.log('Forbiden');
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
        alert('Please login again');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
