import axios from 'axios';
import { envConfig } from './env';
import { useAuthStore } from '@/stores/auth.store';

// create an axios instance
export const axiosInstance = axios.create({
  baseURL: envConfig.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// add a request interceptor
axiosInstance.interceptors.request.use(
  // modify the request config before sending the request
  config => {
    // add Authorization header if accessToken exists
    if (useAuthStore.getState().accessToken)
      config.headers.Authorization = `Bearer ${useAuthStore.getState().accessToken}`;

    // return the config
    return config;
  }
);

// add a response interceptor
axiosInstance.interceptors.response.use(
  // return the response as response.data
  response => response.data,

  // handle errors
  async error => {
    // if error status is not 401, reject the error
    if (!error.response || error.response.status !== 401) return Promise.reject(error);

    // get the original request config
    const originalRequestConfig = error.config;

    // prevent infinite loop of refreshing token if original request is for /token/refresh
    // prevent infinite loop of retrying original request if it was already retried once
    if (originalRequestConfig.url === '/auth/token/refresh' || originalRequestConfig._retry)
      return clearAccessToken(error);

    // mark the request as retried
    originalRequestConfig._retry = true;

    try {
      // send a request to refresh the access token
      const data = await axiosInstance.patch('/auth/token/refresh');

      // update the new access token in authStore
      useAuthStore.getState().updateAccessToken(data.response.data.accessToken);

      // update the Authorization header in the original request config
      originalRequestConfig.headers.Authorization = `Bearer ${data.response.data.accessToken}`;

      // resend the original request with the new access token
      return axiosInstance(originalRequestConfig);
    } catch (error) {
      return clearAccessToken(error);
    }
  }
);

// sub-function to clear accessToken from authStore and reject the error
function clearAccessToken(error) {
  useAuthStore.getState().clearAccessToken();
  return Promise.reject(error);
}
