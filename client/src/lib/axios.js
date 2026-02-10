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
    // get accessToken from authStore
    const { accessToken } = useAuthStore.getState();

    // add Authorization header if accessToken exists
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

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
      return clearAccessTokenAndRedirectToLogin(error);

    // mark the request as retried
    originalRequestConfig._retry = true;

    try {
      // send a request to refresh the access token
      const refreshTokenRequestResponse = await axiosInstance.patch('/auth/token/refresh');

      // get the new access token from the refreshTokenRequestResponse
      const newAccessToken = refreshTokenRequestResponse.response.data.accessToken;

      // update the new access token in authStore
      const { updateAccessToken } = useAuthStore.getState();
      updateAccessToken(newAccessToken);

      // update the Authorization header in the original request config
      originalRequestConfig.headers.Authorization = `Bearer ${newAccessToken}`;

      // resend the original request with the new access token
      return axiosInstance(originalRequestConfig);
    } catch (error) {
      // if refreshing the token fails, clear the access token and redirect to login page
      return clearAccessTokenAndRedirectToLogin(error);
    }
  }
);

// sub-function to clear accessToken and redirect to login page
function clearAccessTokenAndRedirectToLogin(error) {
  const { clearAccessToken } = useAuthStore.getState();
  clearAccessToken();
  window.location.href = '/login';
  return Promise.reject(error);
}
