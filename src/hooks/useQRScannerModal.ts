import { useRef, useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';

interface UseQRScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export function useQRScannerModal({ visible, onClose, onScan }: UseQRScannerModalProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const hasScannedRef = useRef(false);

  useEffect(() => {
    if (visible) {
      hasScannedRef.current = false;
    }
  }, [visible]);

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    if (hasScannedRef.current) {
      return;
    }

    hasScannedRef.current = true;
    onClose();
    onScan(data);
  };

  return {
    permission,
    requestPermission,
    hasScannedRef,
    handleBarCodeScanned,
  };
}
