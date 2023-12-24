import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const BASE_URL = 'localhost:80';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// api.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     config.headers['Authorization'] = 'Bearer YOUR_ACCESS_TOKEN';
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error: AxiosError) =>  Promise.reject(error),
// );