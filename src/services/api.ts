// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/your-php-api", // change later
});

export const getHomeContent = () => API.get("/home");

export default API;