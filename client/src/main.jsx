// Load env variables before rendering the app to ensure their availability throughout the app
import '@/lib/env';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const routerInstance = createRouter({ routeTree });

// Render the app
const rootElement = document.getElementById('root');
if (!rootElement.innerHTML) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={routerInstance} />
    </StrictMode>
  );
}
