import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './router.tsx';
import './index.scss';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
