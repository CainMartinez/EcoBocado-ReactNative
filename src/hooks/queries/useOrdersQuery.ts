/**
 * Hooks de TanStack Query para gestión de pedidos
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../../services/ordersService';
import { OrderStatus } from '../../types';

// Keys para el caché de React Query
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  detail: (id: number) => [...orderKeys.all, 'detail', id] as const,
};

/**
 * Hook para obtener todos los pedidos
 * Actualización automática cada 30 segundos para estar al día con nuevos pedidos
 */
export function useOrders() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: () => ordersService.getAllOrders(),
    staleTime: 1000 * 30, // 30 segundos (los pedidos cambian frecuentemente)
    refetchInterval: 1000 * 30, // Polling cada 30 segundos
  });
}

/**
 * Hook para actualizar el estado de un pedido
 * Invalida automáticamente el caché tras la actualización
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) =>
      ordersService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      // Invalidar el caché de pedidos para que se recarguen
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
