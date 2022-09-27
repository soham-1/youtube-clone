import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8800/api/',
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosInstance;