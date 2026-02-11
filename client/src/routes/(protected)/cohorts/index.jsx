import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/cohorts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/cohorts"!</div>;
}
