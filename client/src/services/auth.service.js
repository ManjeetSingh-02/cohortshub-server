import { axiosInstance } from '@/lib/axios';
import { envConfig } from '@/lib/env';

export const authService = {
  // service to login user with google
  loginWithGoogle: () => (window.location.href = `${envConfig.VITE_API_URL}/auth/login/google`),

  // service to logout user
  logoutUser: () => axiosInstance.post('/auth/logout'),
};
