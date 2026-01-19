import axios from 'axios';
import { LoginResponse } from '../types';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

// Log de configuración para debugging
console.log('🔧 AuthService configurado con API_URL:', API_URL);

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      console.log(`📡 Intentando login en: ${API_URL}/api/delivery/auth/login`);
      
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/delivery/auth/login`,
        { email, password },
        { timeout: 10000 } // 10 segundos timeout
      );
      
      console.log('✅ Login exitoso');
      return response.data;
    } catch (error: any) {
      console.error('❌ Error en login:', error.message);
      
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
