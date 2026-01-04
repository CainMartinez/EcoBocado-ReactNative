import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

interface OrderItem {
  id: number;
  itemType: 'product' | 'rescue_menu';
  productId: number | null;
  rescueMenuId: number | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  itemName: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: number;
  uuid: string | null;
  userId: number;
  status: 'draft' | 'pending_payment' | 'confirmed' | 'prepared' | 'delivered' | 'cancelled' | 'completed';
  pickupSlotId: number | null;
  paymentIntentId: string | null;
  subtotal: number;
  total: number;
  currency: string;
  notes: string | null;
  items: OrderItem[];
  delivery?: {
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    postalCode: string;
    phone: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

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

  updateOrderStatus: async (orderId: number, status: Order['status']): Promise<void> => {
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

export type { Order, OrderItem };
