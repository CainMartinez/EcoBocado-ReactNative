import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QRScannerModalProps } from '../types/QRScanner';
import { styles } from '../styles/qrScanner.styles';
import { colors } from '../utils/theme';

/**
 * Modal con escáner de código QR para verificación de pedidos
 * Solicita permisos de cámara y escanea códigos QR
 */
export function QRScannerModal({ visible, onClose, onScan }: QRScannerModalProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const hasScannedRef = useRef(false);

  useEffect(() => {
    if (visible) {
      // Resetear cuando se abre el modal
      hasScannedRef.current = false;
    }
  }, [visible]);

  // Manejar permisos
  if (!permission) {
    return null; // Aún cargando permisos
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide" transparent={false}>
        <View style={styles.permissionContainer}>
          <MaterialCommunityIcons name="camera-off" size={64} color={colors.text.disabled} />
          <Text style={styles.permissionTitle}>Permiso de cámara requerido</Text>
          <Text style={styles.permissionText}>
            Necesitamos acceso a tu cámara para escanear códigos QR de verificación de pedidos.
          </Text>
          
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Otorgar permiso</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    // Usar ref para chequeo inmediato (más rápido que estado)
    if (hasScannedRef.current) {
      return;
    }

    // Marcar inmediatamente como escaneado
    hasScannedRef.current = true;
    
    // Cerrar modal ANTES de procesar
    onClose();
    
    // Llamar callback con los datos
    onScan(data);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Escanear código QR</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Camera View */}
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={hasScannedRef.current ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          />
          {/* Overlay con marco de escaneo - FUERA del CameraView para evitar warning */}
          <View style={styles.overlay}>
            <View style={styles.overlayTop} />
            <View style={styles.overlayMiddle}>
              <View style={styles.overlaySide} />
              <View style={styles.scanFrame}>
                {/* Esquinas del marco */}
                <View style={[styles.corner, styles.cornerTopLeft]} />
                <View style={[styles.corner, styles.cornerTopRight]} />
                <View style={[styles.corner, styles.cornerBottomLeft]} />
                <View style={[styles.corner, styles.cornerBottomRight]} />
              </View>
              <View style={styles.overlaySide} />
            </View>
            <View style={styles.overlayBottom}>
              <Text style={styles.instructionText}>
                Coloca el código QR dentro del marco
              </Text>
            </View>
          </View>
        </View>

        {/* Footer con instrucciones */}
        <View style={styles.footer}>
          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="information" size={24} color={colors.primary.main} />
            <Text style={styles.infoText}>
              Solicita al cliente que muestre el código QR de su pedido
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
