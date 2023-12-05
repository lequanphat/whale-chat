import axios from 'axios';
// import Cookies from 'js-cookie';
const authApi = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default authApi;
