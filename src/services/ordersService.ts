import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { Order, OrderStatus } from '../types';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const ordersService = {
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const response = await axios.get<Order[]>(
        `${API_URL}/api/orders`,
        getAuthHeaders()
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al obtener los pedidos');
    }
  },

  updateOrderStatus: async (orderId: number, status: OrderStatus): Promise<void> => {
    try {
      // Nota: Este endpoint necesita ser creado en el backend
      await axios.patch(
        `${API_URL}/api/orders/${orderId}/status`,
        { status },
        getAuthHeaders()
      );
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al actualizar el estado del pedido');
    }
  },
};
