import { useAuthStore } from '../store/authStore';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

interface UpdateLocationDto {
  latitude: number;
  longitude: number;
  orderId?: number;
}

interface DeliveryLocationResponse {
  deliveryUserId: number;
  orderId: number | null;
  latitude: string;
  longitude: string;
  updatedAt: string;
}

export const locationService = {
  updateLocation: async (dto: UpdateLocationDto): Promise<DeliveryLocationResponse> => {
    const token = useAuthStore.getState().accessToken;
    
    try {
      const response = await fetch(`${API_URL}/api/orders/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          latitude: dto.latitude,
          longitude: dto.longitude,
          // NO enviamos orderId, la ubicación es del repartidor para TODOS sus pedidos
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error HTTP ${response.status}`;
        throw new Error(`Error al actualizar la ubicación: ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  getLocationByOrder: async (orderId: number): Promise<DeliveryLocationResponse | null> => {
    const token = useAuthStore.getState().accessToken;
    
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/location`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error HTTP ${response.status}`;
        throw new Error(`Error al obtener la ubicación: ${errorMessage}`);
      }

      return response.json();
    } catch (error: any) {
      console.error('❌ Error obteniendo ubicación:', error);
      throw error;
    }
  },
};
