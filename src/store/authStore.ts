import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeliveryDriver } from '../types';

interface AuthState {
  accessToken: string | null;
  user: DeliveryDriver | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (accessToken: string, user: DeliveryDriver) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: (accessToken, user) => 
        set({ 
          accessToken, 
          user, 
          isAuthenticated: true,
          isLoading: false,
        }),
      
      logout: () => 
        set({ 
          accessToken: null, 
          user: null, 
          isAuthenticated: false,
          isLoading: false,
        }),
      
      setLoading: (loading) => 
        set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
