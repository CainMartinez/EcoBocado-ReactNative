import axios from 'axios';
import { LoginResponse } from '../types';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/delivery/auth/login`,
        { email, password },
        { timeout: 10000 } // 10 segundos timeout
      );
      
      return response.data;
    } catch (error: any) {
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        throw new Error(
          `No se pudo conectar al servidor en ${API_URL}. ` +
          'Verifica que el backend esté corriendo y que estés en la misma red WiFi.'
        );
      }
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      throw new Error('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  },
};
