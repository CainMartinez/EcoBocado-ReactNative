/**
 * Hooks de TanStack Query para gestión de ubicación del repartidor
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { locationService } from '../../services/locationService';

// Keys para el caché de React Query
export const locationKeys = {
  all: ['location'] as const,
  byOrder: (orderId: number) => [...locationKeys.all, 'order', orderId] as const,
};

/**
 * Hook para obtener la ubicación del repartidor para un pedido específico
 */
export function useOrderLocation(orderId: number) {
  return useQuery({
    queryKey: locationKeys.byOrder(orderId),
    queryFn: () => locationService.getLocationByOrder(orderId),
    staleTime: 1000 * 10, // 10 segundos (ubicación en tiempo semi-real)
    refetchInterval: 1000 * 10, // Polling cada 10 segundos
  });
}

/**
 * Hook para actualizar la ubicación del repartidor
 * Invalida automáticamente el caché de ubicaciones
 */
export function useUpdateLocation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (dto: { latitude: number; longitude: number; orderId?: number }) =>
      locationService.updateLocation(dto),
    onSuccess: () => {
      // Invalidar todas las ubicaciones para que se recarguen
      queryClient.invalidateQueries({ queryKey: locationKeys.all });
    },
  });
}
