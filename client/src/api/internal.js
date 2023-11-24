import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:2411",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
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
const logout = async () => {
    try {
        const respone = await api.post('/api/auth/logout');
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
}

const getAllMessages = async (data) => {
    try {
        const respone = await api.post('/api/message/get-all-messages', data);
        return respone;
    } catch (error) {
        return error;
    }
}
const getAllContacts = async (data) => {
    try {
        const respone = await api.get('/api/auth/all-users/'+data);
        return respone;
    } catch (error) {
        return error;
    }
}

const setAvatar = async (id, data) => {
    try {
        const respone = await api.post('/api/auth/set-avatar/'+id, data);
        return respone;
    } catch (error) {
        return error;
    }
}

export { login, register, logout, sendMessage, getAllMessages,getAllContacts, setAvatar };
