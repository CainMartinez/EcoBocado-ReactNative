import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Order } from '../types';
import { ordersService } from '../services/ordersService';

export function useDeliveries() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const allOrders = await ordersService.getAllOrders();
      
      const filteredOrders = allOrders.filter(order => 
        order.deliveryType !== 'pickup' &&
        ['confirmed', 'delivered', 'completed'].includes(order.status)
      );
      
      setOrders(filteredOrders);
    } catch (error: any) {
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

  const updateOrderStatus = async (orderId: number, currentStatus: Order['status']) => {
    let newStatus: Order['status'];
    let confirmMessage: string;

    if (currentStatus === 'confirmed') {
      newStatus = 'delivered';
      confirmMessage = 'Si te asignas este pedido, estarás en camino para entregarlo. ¿Deseas continuar?';
    } else {
      return null;
    }

    return new Promise<boolean>((resolve) => {
      Alert.alert(
        'Actualizar estado',
        confirmMessage,
        [
          { 
            text: 'Cancelar', 
            style: 'cancel',
            onPress: () => resolve(false)
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                await ordersService.updateOrderStatus(orderId, newStatus);
                Alert.alert('Éxito', 'Estado actualizado correctamente');
                await fetchOrders();
                resolve(true);
              } catch (error: any) {
                Alert.alert('Error', error.message || 'Error al actualizar el estado');
                resolve(false);
              }
            },
          },
        ]
      );
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    refreshing,
    fetchOrders,
    onRefresh,
    updateOrderStatus,
  };
}
