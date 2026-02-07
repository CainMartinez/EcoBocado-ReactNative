import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type { DeliveryDriver } from '../types';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const profileService = {
  /**
   * Obtiene el perfil del repartidor autenticado
   */
  getProfile: async (): Promise<DeliveryDriver> => {
    try {
      const response = await axios.get<DeliveryDriver>(
        `${API_URL}/api/delivery/profile/me`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error: any) {
      console.error('[ProfileService] Error al obtener perfil:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: `${API_URL}/api/delivery/profile/me`,
      });
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al obtener el perfil');
    }
  },

  /**
   * Sube una foto de perfil (avatar)
   * @param imageUri URI de la imagen (puede ser de cámara o galería)
   */
  uploadAvatar: async (imageUri: string): Promise<DeliveryDriver> => {
    try {
      const formData = new FormData();
      
      // En React Native, necesitamos crear un objeto con uri, type y name
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      
      formData.append('file', {
        uri: imageUri,
        type: `image/${fileType}`,
        name: `avatar.${fileType}`,
      } as any);

      const token = useAuthStore.getState().accessToken;
      
      const response = await axios.post<DeliveryDriver>(
        `${API_URL}/api/delivery/profile/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al subir la foto de perfil');
    }
  },
};
