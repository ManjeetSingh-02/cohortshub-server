import { axiosInstance } from '@/lib/axios';
import { envConfig } from '@/lib/env';
import { useAuthStore } from '@/stores/auth.store';

export const authService = {
  // function to login user with google
  loginWithGoogle: () => (window.location.href = `${envConfig.VITE_API_URL}/auth/login/google`),

  // function to logout user
  logoutUser: async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      useAuthStore.getState().clearAccessToken();
    }
  },
};
