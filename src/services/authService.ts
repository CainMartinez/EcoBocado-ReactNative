import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_NESTJS_API_URL || 'http://localhost:8080';

interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  driver: {
    id: number;
    uuid: string;
    email: string;
    name: string;
    phone: string;
    avatarUrl: string | null;
    isAvailable: number;
    vehicleType: string;
    vehiclePlate: string;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/delivery/auth/login`,
        { email, password }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  },
};
