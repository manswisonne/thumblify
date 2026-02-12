// import axios from 'axios';

// const api = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",  // : not = , comma at end
//     withCredentials: true
// });

// export default api;
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://thumblify-1.onrender.com';

const api = axios.create({
  baseURL: API_URL,  // ✅ Fixed - API_URL is now a proper string
  withCredentials: true,
});

// Optional: Add request interceptor for debugging
api.interceptors.request.use(config => {
  console.log('Axios requesting:', config.url, config.method?.toUpperCase());
  return config;
});

export default api;
