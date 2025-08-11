import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import AuthProvider from './Provider/AuthProvider.jsx';
import { router } from './Routes/Router.jsx';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <RouterProvider router={router} />
     
    </AuthProvider>
    </QueryClientProvider>
    
  </StrictMode>
);
