import { axiosInstance } from './axios';
import { useAuthStore } from '@/stores/auth.store';

// function to restore session
export async function restoreSession() {
  // get state and action from auth store
  const { accessToken, updateAccessToken, clearAccessToken } = useAuthStore.getState();

  // if accessToken exists, return true to indicate session is restored
  if (accessToken) return true;

  // if accessToken does not exist, try to refresh it using the refresh token
  try {
    const data = await axiosInstance.patch('/auth/token/refresh');
    updateAccessToken(data.response.data.accessToken);
    return true;
  } catch (error) {
    clearAccessToken();
    return false;
  }
}
