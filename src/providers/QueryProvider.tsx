/**
 * Provider de TanStack Query
 * Proporciona el QueryClient a toda la aplicación
 */

import React, { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../config/queryClient';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Provider global de React Query
 * Debe envolver toda la aplicación para habilitar el uso de hooks de queries
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
