import axios from 'axios';
import storage from '../Storage';

const api = axios.create();

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();
  const headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;
