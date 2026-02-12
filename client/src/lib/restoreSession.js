import { axiosInstance } from './axios';
import { useAuthStore } from '@/stores/auth.store';

// function to restore session
export async function restoreSession() {
  // if accessToken exists, return true to indicate session is restored
  if (useAuthStore.getState().accessToken) return true;

  // if accessToken does not exist, try to refresh it using the refresh token
  try {
    const data = await axiosInstance.patch('/auth/token/refresh');
    useAuthStore.getState().updateAccessToken(data.response.data.accessToken);
    return true;
  } catch (error) {
    useAuthStore.getState().logout(false);
    return false;
  }
}
