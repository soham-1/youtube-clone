import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8800/api/',
    headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
    },
});

export default axiosInstance;