import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { RankingResponse } from '../types';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getRanking = async (): Promise<RankingResponse> => {
  try {
    const response = await axios.get<RankingResponse>(
      `${API_URL}/api/orders/ranking/delivery`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error al obtener el ranking');
  }
};
