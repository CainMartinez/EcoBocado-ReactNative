import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { DeliveryStats } from '../types';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const statsService = {
  getDeliveryStats: async (): Promise<DeliveryStats> => {
    try {
      const response = await axios.get<DeliveryStats>(
        `${API_URL}/api/orders/stats/delivery`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al obtener las estadísticas');
    }
  },
};

export type { DeliveryStats as Stats };
