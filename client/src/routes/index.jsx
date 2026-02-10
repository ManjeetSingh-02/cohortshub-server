import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/stores/auth.store';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    // get state and action from auth store
    const { accessToken, updateAccessToken } = useAuthStore.getState();

    // if accessToken exists, redirect to the cohorts page
    if (accessToken) throw redirect({ to: '/cohorts' });

    // else make request to refresh token, update in store and redirect to cohorts page
    try {
      const data = await axiosInstance.patch('/auth/token/refresh');
      updateAccessToken(data.response.data.accessToken);
      throw redirect({ to: '/cohorts' });
    } catch (error) {
      throw redirect({ to: '/login' });
    }
  },
});
