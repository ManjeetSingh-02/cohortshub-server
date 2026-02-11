import { restoreSession } from '@/lib/restoreSession';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)')({
  beforeLoad: async () => {
    const isAuthenticated = await restoreSession();

    // if the user is not authenticated, redirect to the login page
    if (!isAuthenticated) throw redirect({ to: '/login' });
  },
});
