import { envConfig } from '@/lib/env';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <button
        onClick={() => (window.location.href = `${envConfig.VITE_API_URL}/auth/login/google`)}
        className="cursor-pointer rounded-xl border border-white bg-black p-4 text-white transition-all duration-400 hover:border-black hover:bg-white hover:text-black"
      >
        Login with Google
      </button>
    </div>
  );
}
