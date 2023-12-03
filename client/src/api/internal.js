import axios from 'axios';
// import Cookies from 'js-cookie';
const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalReq = error.config;
        if ((error.response.status === 401 || error.response.status === 403 || error.response.status === 500) && originalReq && !originalReq._isRerty) {
            originalReq._isRerty = true;
            try {
                await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/api/auth/refresh-token`, {
                    withCredentials: true,
                });
                return api.request(originalReq);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    },
);





const login = async (data) => {
    try {
        const respone = await api.post('/api/auth/login', data);
        return respone;
    } catch (error) {
        return error;
    }
};
const register = async (data) => {
    try {
        const respone = await api.post('/api/auth/register', data);
        return respone;
    } catch (error) {
        return error;
    }
};
const logout = async (data) => {
    try {
        const respone = await api.post('/api/auth/logout', data);
        return respone;
    } catch (error) {
        return error;
    }
};

const sendMessage = async (data) => {
    try {
        const respone = await api.post('/api/message/add-message', data);
        return respone;
    } catch (error) {
        return error;
    }
};

const getAllMessages = async (data) => {
    try {
        const respone = await api.post('/api/message/get-all-messages', data);
        return respone;
    } catch (error) {
        return error;
    }
};
const getAllContacts = async (data) => {
    try {
        const respone = await api.get('/api/auth/all-users/' + data);
        return respone;
    } catch (error) {
        return error;
    }
};

const setAvatar = async (id, data) => {
    try {
        const respone = await api.post('/api/auth/set-avatar/' + id, data);
        return respone;
    } catch (error) {
        return error;
    }
};

const getUser = async () => {
    try {
        const respone = await api.get('/api/auth/user');
        return respone;
    } catch (error) {
        return error;
    }
};
const autoLogin = async () => {
    try {
        const respone = await api.get('/api/auth/refresh-token');
        return respone;
    } catch (error) {
        return error;
    }
};

export { login, register, logout, sendMessage, getAllMessages, getAllContacts, setAvatar, getUser, autoLogin };
export default api;