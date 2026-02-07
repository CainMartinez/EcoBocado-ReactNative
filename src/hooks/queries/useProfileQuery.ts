/**
 * Hooks de TanStack Query para gestión del perfil del repartidor
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../../services/profileService';

// Keys para el caché de React Query
export const profileKeys = {
  all: ['profile'] as const,
  me: () => [...profileKeys.all, 'me'] as const,
};

/**
 * Hook para obtener el perfil del repartidor autenticado
 */
export function useProfile() {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: () => profileService.getProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutos (el perfil no cambia frecuentemente)
  });
}

/**
 * Hook para subir/actualizar la foto de perfil (avatar)
 * Invalida automáticamente el caché del perfil tras subir
 */
export function useUploadAvatar() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (imageUri: string) => profileService.uploadAvatar(imageUri),
    onSuccess: (updatedProfile) => {
      // Actualizar el caché del perfil con los nuevos datos
      queryClient.setQueryData(profileKeys.me(), updatedProfile);
      
      // También invalidar por si acaso
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
}
