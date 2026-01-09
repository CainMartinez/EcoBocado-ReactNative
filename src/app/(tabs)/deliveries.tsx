import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, RefreshControl, Alert, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../../components/ui';
import { colors, spacing } from '../../utils/theme';
import { ordersService, Order } from '../../services/ordersService';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  orderCard: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  orderAmount: {
    fontSize: 20,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLine1: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
    marginBottom: 2,
  },
  addressLine2: {
    fontSize: 13,
    color: colors.primary.main,
    marginBottom: 2,
  },
  addressCity: {
    fontSize: 13,
    color: colors.primary.main,
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.default,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  itemsContainer: {
    marginVertical: spacing.md,
    padding: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  item: {
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
    marginVertical: 2,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  totalValue: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  totalLabelBold: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  totalValueBold: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
});
