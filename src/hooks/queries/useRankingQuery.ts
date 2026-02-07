/**
 * Hooks de TanStack Query para gestión del ranking de repartidores
 */

import { useQuery } from '@tanstack/react-query';
import { getRanking } from '../../services/rankingService';

// Keys para el caché de React Query
export const rankingKeys = {
  all: ['ranking'] as const,
  delivery: () => [...rankingKeys.all, 'delivery'] as const,
};

/**
 * Hook para obtener el ranking de repartidores
 * Se actualiza cada 5 minutos para reflejar cambios en el ranking
 */
export function useRanking() {
  return useQuery({
    queryKey: rankingKeys.delivery(),
    queryFn: getRanking,
    staleTime: 1000 * 60 * 5, // 5 minutos (el ranking no cambia tan rápido)
    refetchInterval: 1000 * 60 * 5, // Polling cada 5 minutos
  });
}
