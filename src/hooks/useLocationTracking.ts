import { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { locationService } from '../services/locationService';

const LOCATION_UPDATE_INTERVAL = 3 * 60 * 1000; // 3 minutos

export const useLocationTracking = () => {
  const { user } = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTrackingRef = useRef(false);

  const requestPermissions = async (): Promise<boolean> => {
    try {
      // Solicitar permisos de ubicación en primer plano
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (foregroundStatus !== 'granted') {
        console.warn('Permisos de ubicación denegados');
        return false;
      }

      // En Android, también solicitar permisos en segundo plano
      if (Platform.OS === 'android') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
          console.warn('Permisos de ubicación en segundo plano denegados');
        }
      }

      return true;
    } catch (error) {
      console.error('Error solicitando permisos de ubicación:', error);
      return false;
    }
  };

  const sendLocation = async () => {
    try {
      // Verificar permisos antes de obtener ubicación
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
          return;
        }
      }
      
      // Obtener ubicación actual con alta precisión
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        mayShowUserSettingsDialog: true,
      });

      const { latitude, longitude } = location.coords;

      // Enviar al backend (sin orderId, la ubicación es del repartidor para TODOS sus pedidos)
      await locationService.updateLocation({
        latitude,
        longitude,
      });
    } catch (error: any) {
    }
  };

  const startTracking = async () => {
    if (isTrackingRef.current) return;

    const hasPermission = await requestPermissions();
    if (!hasPermission || !user) return;

    isTrackingRef.current = true;

    // Enviar ubicación inmediatamente
    await sendLocation();

    // Configurar intervalo para enviar cada 3 minutos
    intervalRef.current = setInterval(sendLocation, LOCATION_UPDATE_INTERVAL);

    console.log('Tracking de ubicación iniciado');
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isTrackingRef.current = false;
    console.log('Tracking de ubicación detenido');
  };

  // Iniciar tracking automáticamente cuando hay un usuario autenticado
  useEffect(() => {
    if (user) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [user]);

  return {
    startTracking,
    stopTracking,
    isTracking: isTrackingRef.current,
  };
};
