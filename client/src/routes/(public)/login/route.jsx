import { restoreSession } from '@/lib/restoreSession';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/login')({
  beforeLoad: async () => {
    const isAuthenticated = await restoreSession();

    // if the user is already authenticated, redirect to the cohorts page
    if (isAuthenticated) throw redirect({ to: '/cohorts' });
  },
});
