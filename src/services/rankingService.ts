import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { RankingResponse } from '../types';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;
  console.log('🔑 [RANKING SERVICE] Token:', token ? 'presente' : 'ausente');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getRanking = async (): Promise<RankingResponse> => {
  try {
    console.log('📡 [RANKING SERVICE] Llamando a:', `${API_URL}/api/orders/ranking/delivery`);
    const response = await axios.get<RankingResponse>(
      `${API_URL}/api/orders/ranking/delivery`,
      getAuthHeaders()
    );
    console.log('✅ [RANKING SERVICE] Respuesta recibida');
    return response.data;
  } catch (error: any) {
    console.error('❌ [RANKING SERVICE] Error:', error.response?.status, error.response?.data);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error al obtener el ranking');
  }
};
