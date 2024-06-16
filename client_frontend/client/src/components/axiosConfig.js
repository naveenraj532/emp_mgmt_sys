import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
