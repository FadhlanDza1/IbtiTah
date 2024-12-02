import axios from "axios";

const BASE_URL ="https://tahfidz-tracker.vercel.app"

const api = axios.create({
    baseURL:BASE_URL
});

export default api;