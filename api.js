import axios from "axios";

// ✅ Base URL points to backend + /api
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
