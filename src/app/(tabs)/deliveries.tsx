import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, RefreshControl, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../../components/ui';
import { colors, spacing } from '../../utils/theme';
import { Order } from '../../types';
import { ordersService } from '../../services/ordersService';
import { styles } from '../../styles/deliveries.styles';

const STATUS_COLORS = {
  confirmed: {
    background: '#FFF3E0',
    border: '#FF9800',
    text: '#E65100',
    label: 'Confirmado - Acción requerida',
  },
  delivered: {
    background: '#E8F5E9',
    border: '#4CAF50',
    text: '#2E7D32',
    label: 'En marcha',
  },
  completed: {
    background: colors.background.paper,
    border: colors.text.disabled,
    text: colors.text.secondary,
    label: 'Completado',
  },
};

export default function DeliveriesScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const allOrders = await ordersService.getAllOrders();
      
      // Filtrar solo confirmed, delivered y completed
      const filteredOrders = allOrders.filter(order => 
        ['confirmed', 'delivered', 'completed'].includes(order.status)
      );
      
      setOrders(filteredOrders);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', error.message || 'Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const openInMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const handleUpdateStatus = async (orderId: number, currentStatus: Order['status']) => {
    let newStatus: Order['status'];
    let confirmMessage: string;

    if (currentStatus === 'confirmed') {
      newStatus = 'delivered';
      confirmMessage = '¿Marcar pedido como "En marcha"?';
    } else if (currentStatus === 'delivered') {
      newStatus = 'completed';
      confirmMessage = '¿Marcar pedido como "Completado"?';
    } else {
      return; // No se puede cambiar el estado de completed
    }

    Alert.alert(
      'Actualizar estado',
      confirmMessage,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await ordersService.updateOrderStatus(orderId, newStatus);
              Alert.alert('Éxito', 'Estado actualizado correctamente');
              fetchOrders();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Error al actualizar el estado');
            }
          },
        },
      ]
    );
  };

  const getStatusColors = (status: Order['status']) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.completed;
  };

  const formatOrderNumber = (order: Order) => {
    return order.uuid ? `#${order.uuid.substring(0, 8)}` : `#${order.id}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
          {orders.length === 0 && !loading ? (
            <Text style={styles.emptyText}>No hay entregas pendientes</Text>
          ) : (
            orders.map((order) => {
              const statusColors = getStatusColors(order.status);
              
              // Validación defensiva para evitar crashes si faltan campos
              // Convertir a número porque TypeORM puede devolver DECIMAL como string
              const total = Number(order.total) || 0;
              const subtotal = Number(order.subtotal) || 0;
              
              return (
                <View 
                  key={order.id} 
                  style={[
                    styles.orderCard,
                    { 
                      backgroundColor: statusColors.background,
                      borderColor: statusColors.border,
                      borderWidth: 2,
                    }
                  ]}
                >
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderNumber}>{formatOrderNumber(order)}</Text>
                    <Text style={[styles.orderAmount, { color: statusColors.text }]}>
                      €{total.toFixed(2)}
                    </Text>
                  </View>

                  <View style={[styles.statusBadge, { backgroundColor: statusColors.border }]}>
                    <Text style={styles.statusText}>{statusColors.label}</Text>
                  </View>

                  {order.delivery && (
                    <TouchableOpacity
                      style={styles.addressContainer}
                      onPress={() => openInMaps(order.delivery!.addressLine1)}
                    >
                      <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary.main} />
                      <View style={styles.addressTextContainer}>
                        <Text style={styles.addressLine1}>{order.delivery.addressLine1}</Text>
                        {order.delivery.addressLine2 && (
                          <Text style={styles.addressLine2}>{order.delivery.addressLine2}</Text>
                        )}
                        <Text style={styles.addressCity}>
                          {order.delivery.city}, {order.delivery.postalCode}
                        </Text>
                        {order.delivery.phone && (
                          <Text style={styles.addressPhone}>Tel: {order.delivery.phone}</Text>
                        )}
                      </View>
                      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.primary.main} />
                    </TouchableOpacity>
                  )}

                  {order.notes && (
                    <View style={styles.notesContainer}>
                      <MaterialCommunityIcons name="note-text" size={16} color={colors.text.secondary} />
                      <Text style={styles.notesText}>{order.notes}</Text>
                    </View>
                  )}

                  <View style={styles.itemsContainer}>
                    <Text style={styles.itemsTitle}>Productos ({order.items.length}):</Text>
                    {order.items.map((item) => (
                      <Text key={item.id} style={styles.item}>
                        • {item.itemName} x{item.quantity} - €{(Number(item.lineTotal) || 0).toFixed(2)}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.totalsRow}>
                    <Text style={styles.totalLabel}>Subtotal:</Text>
                    <Text style={styles.totalValue}>€{subtotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.totalsRow}>
                    <Text style={styles.totalLabelBold}>Total:</Text>
                    <Text style={styles.totalValueBold}>€{total.toFixed(2)}</Text>
                  </View>

                  {order.status !== 'completed' && (
                    <Button 
                      mode="contained" 
                      onPress={() => handleUpdateStatus(order.id, order.status)}
                      style={{ marginTop: spacing.md }}
                    >
                      {order.status === 'confirmed' ? 'Marcar en marcha' : 'Marcar completado'}
                    </Button>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
  );
}
