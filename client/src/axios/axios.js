import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://192.168.1.7:3000/api', // default base URL

    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;