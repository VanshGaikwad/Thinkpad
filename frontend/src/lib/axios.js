import axios from "axios";

// if production, there's no localhost, it's just /api
const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:5001/api" :"/api"
const api = axios.create({
    baseURL: BASE_URL ,
    
});
export default api;