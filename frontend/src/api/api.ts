import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.PUBLIC_API_URL
});

export default api;