import { useAuthStore } from '@/stores/auth.store';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    // get state from the auth store
    const { accessToken } = useAuthStore.getState();

    // if accessToken exists, redirect to the home page
    if (accessToken) throw redirect({ to: '/' });
  },
});
