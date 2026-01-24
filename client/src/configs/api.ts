// import axios from 'axios';

// const api = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",  // : not = , comma at end
//     withCredentials: true
// });

// export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',              // ← relative path – Vite proxy will handle the rest
  withCredentials: true,
});

// Optional: Add request interceptor for debugging
api.interceptors.request.use(config => {
  console.log('Axios requesting:', config.url, config.method?.toUpperCase());
  return config;
});

export default api;
