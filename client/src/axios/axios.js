import axios from "axios";

let BASE_URL = import.meta.env.VITE_BASE_URL

// Create an Axios instance
const api = axios.create({

    baseURL: `${BASE_URL}/api`, // default base URL

    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});

export default api;