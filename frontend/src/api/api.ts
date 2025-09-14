import axios from "axios";

const api = axios.create({
    baseURL: "http://4.228.218.244/api"
});

export default api;