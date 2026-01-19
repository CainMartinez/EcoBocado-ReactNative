export interface QRScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export interface QRScanData {
  orderId: number;
  uuid: string;
  userId: number;
  total: number;
  status: string;
  timestamp: number;
}
