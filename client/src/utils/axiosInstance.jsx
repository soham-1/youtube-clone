import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8800/api/',
    timeout: 2000,
    headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosInstance;