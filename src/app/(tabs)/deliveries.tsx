import React from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { QRScannerModal } from '../../components/QRScannerModal';
import { OrderCard } from '../../components/deliveries';
import { useDeliveries, useQRScanner, useLocationTracking } from '../../hooks';
import { colors } from '../../utils/theme';
import { styles } from '../../styles/deliveries.styles';
import type { OrderStatus, Order } from '../../types';

export default function DeliveriesScreen() {
  // Custom hooks para manejar la lógica
  const { orders, loading, refreshing, onRefresh, updateOrderStatus } = useDeliveries();
  const { 
    qrScannerVisible, 
    selectedOrderId, 
    openScanner, 
    closeScanner, 
    handleQRScanned 
  } = useQRScanner();

  // Hook para tracking de ubicación (enviará ubicación cada 3 minutos)
  useLocationTracking();

  // Manejar actualización de estado con lógica de QR scanner
  const handleOrderAction = (orderId: number, status: OrderStatus) => {
    if (status === 'confirmed') {
      updateOrderStatus(orderId, status);
    } else if (status === 'delivered') {
      openScanner(orderId);
    }
  };

  if (loading && orders.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList<Order>
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => handleOrderAction(item.id, item.status)}
          />
        )}
        contentContainerStyle={styles.content}
        refreshControl={(
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )}
      />

      <QRScannerModal
        visible={qrScannerVisible}
        onClose={closeScanner}
        onScan={handleQRScanned}
      />
    </View>
  );
}
