import { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { ordersService } from '../services/ordersService';

interface UseQRScannerProps {
  onSuccess?: () => void;
}

export function useQRScanner({ onSuccess }: UseQRScannerProps = {}) {
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const isProcessingQRRef = useRef(false);

  const openScanner = (orderId: number) => {
    setSelectedOrderId(orderId);
    setQrScannerVisible(true);
  };

  const closeScanner = () => {
    setQrScannerVisible(false);
    setSelectedOrderId(null);
    isProcessingQRRef.current = false;
  };

  const handleQRScanned = async (qrData: string) => {
    if (isProcessingQRRef.current) {
      return;
    }

    isProcessingQRRef.current = true;

    try {
      const scannedData = JSON.parse(qrData);
      
      if (selectedOrderId === null) {
        Alert.alert('Error', 'No se ha seleccionado ningún pedido.');
        return;
      }
      
      if (scannedData.orderId !== selectedOrderId) {
        Alert.alert(
          'Error de verificación',
          `El código QR es del pedido #${scannedData.orderId}, pero seleccionaste el pedido #${selectedOrderId}.`
        );
        return;
      }

      const now = Date.now();
      const qrTimestamp = scannedData.timestamp;
      const maxAge = 30 * 60 * 1000;
      
      if (now - qrTimestamp > maxAge) {
        Alert.alert(
          'Código expirado',
          'El código QR ha expirado. Solicita al cliente que genere uno nuevo.'
        );
        return;
      }

      await ordersService.updateOrderStatus(selectedOrderId, 'completed');
      
      Alert.alert(
        '✅ Pedido completado',
        `El pedido #${scannedData.orderId} ha sido marcado como completado exitosamente.`
      );
      
      onSuccess?.();
      
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'El código QR no es válido. Solicita al cliente que muestre el código correcto.'
      );
    } finally {
      setSelectedOrderId(null);
      isProcessingQRRef.current = false;
    }
  };

  return {
    qrScannerVisible,
    selectedOrderId,
    openScanner,
    closeScanner,
    handleQRScanned,
  };
}
