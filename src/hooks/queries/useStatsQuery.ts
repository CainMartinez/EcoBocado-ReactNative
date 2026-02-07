/**
 * Hooks de TanStack Query para gestión de estadísticas
 */

import { useQuery } from '@tanstack/react-query';
import { statsService } from '../../services/statsService';

// Keys para el caché de React Query
export const statsKeys = {
  all: ['stats'] as const,
  delivery: () => [...statsKeys.all, 'delivery'] as const,
};

/**
 * Hook para obtener estadísticas de entrega del repartidor
 * Se actualizan cada 2 minutos para reflejar cambios en tiempo semi-real
 */
export function useDeliveryStats() {
  return useQuery({
    queryKey: statsKeys.delivery(),
    queryFn: () => statsService.getDeliveryStats(),
    staleTime: 1000 * 60 * 2, // 2 minutos
    refetchInterval: 1000 * 60 * 2, // Polling cada 2 minutos
  });
}
