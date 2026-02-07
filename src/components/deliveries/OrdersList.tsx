/**
 * Lista de pedidos con TanStack Query
 * Actualización automática cada 30 segundos
 */

import React from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useOrders, useUpdateOrderStatus } from '../../hooks/queries';
import type { Order, OrderStatus } from '../../types';
import { styles } from '../../styles/ordersList.styles';

export function OrdersList() {
  const { 
    data: orders, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    isRefetching 
  } = useOrders();

  const updateStatus = useUpdateOrderStatus();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Cargando pedidos...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error al cargar pedidos</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleUpdateStatus = async (orderId: number, newStatus: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status: newStatus });
    } catch (error: any) {
      console.error('Error al actualizar pedido:', error.message);
    }
  };

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <OrderStatusCard 
          order={item} 
          onUpdateStatus={handleUpdateStatus}
          isUpdating={updateStatus.isPending}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>No hay pedidos disponibles</Text>
        </View>
      }
    />
  );
}

interface OrderStatusCardProps {
  order: Order;
  onUpdateStatus: (orderId: number, status: OrderStatus) => void;
  isUpdating: boolean;
}

function OrderStatusCard({ order, onUpdateStatus, isUpdating }: OrderStatusCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Pedido #{order.id}</Text>
      <Text style={styles.cardText}>Estado: {order.status}</Text>
      <Text style={styles.cardText}>Total: €{order.total}</Text>
      
      <View style={styles.buttonContainer}>
        {order.status === 'confirmed' && (
          <TouchableOpacity
            onPress={() => onUpdateStatus(order.id, 'prepared')}
            disabled={isUpdating}
            style={[styles.statusButton, isUpdating && styles.statusButtonDisabled]}
          >
            <Text style={styles.statusButtonText}>Marcar preparado</Text>
          </TouchableOpacity>
        )}
        
        {order.status === 'prepared' && (
          <TouchableOpacity
            onPress={() => onUpdateStatus(order.id, 'delivered')}
            disabled={isUpdating}
            style={[styles.statusButton, isUpdating && styles.statusButtonDisabled]}
          >
            <Text style={styles.statusButtonText}>Marcar entregado</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
