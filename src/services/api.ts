import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.cryptolens.io/api/key/Activate'
});

export default api;