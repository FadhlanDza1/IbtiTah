import axios from "axios";

const BASE_URL ="https://server-ibtitah.vercel.app"

const api = axios.create({
    baseURL:BASE_URL
});

export default api;