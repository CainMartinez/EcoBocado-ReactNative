import { Linking } from 'react-native';
import type { Order } from '../types';
import { colors } from '../utils/theme';

export function useOrderCard() {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return colors.warning;        // Naranja - Requiere acción
      case 'delivered':
        return colors.info;           // Azul - En proceso
      case 'completed':
        return colors.success;        // Verde - Completado
      default:
        return colors.neutral.gray;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'delivered':
        return 'Enviado';
      case 'completed':
        return 'Completado';
      default:
        return status;
    }
  };

  const getButtonConfig = (status: Order['status']) => {
    if (status === 'confirmed') {
      return {
        backgroundColor: colors.success,
        icon: 'check-circle' as const,
        text: 'Asignarte el pedido',
      };
    }
    if (status === 'delivered') {
      return {
        backgroundColor: colors.info,
        icon: 'qrcode-scan' as const,
        text: 'Escanear QR y completar',
      };
    }
    return null;
  };

  const openInMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return {
    getStatusColor,
    getStatusText,
    getButtonConfig,
    openInMaps,
  };
}
