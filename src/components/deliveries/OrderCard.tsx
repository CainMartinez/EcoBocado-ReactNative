import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Order } from '../../types';
import { useOrderCard } from '../../hooks';
import { styles } from '../../styles/orderCard.styles';
import { colors } from '../../utils/theme';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  const { getStatusColor, getStatusText, getButtonConfig, openInMaps } = useOrderCard();

  const buttonConfig = getButtonConfig(order.status);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>Pedido #{order.id}</Text>
          <Text style={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>

      {/* Delivery Address */}
      {order.delivery && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary.main} />
            <Text style={styles.sectionTitle}>Dirección de entrega</Text>
          </View>
          <TouchableOpacity 
            style={styles.addressContainer}
            onPress={() => openInMaps(order.delivery!.addressLine1)}
          >
            <View style={styles.addressTextContainer}>
              <Text style={styles.addressLine}>{order.delivery.addressLine1}</Text>
              {order.delivery.addressLine2 && (
                <Text style={styles.addressLine}>{order.delivery.addressLine2}</Text>
              )}
              <Text style={styles.addressLine}>
                {order.delivery.city}, {order.delivery.postalCode}
              </Text>
              {order.delivery.phone && (
                <Text style={styles.addressLine}>Tel: {order.delivery.phone}</Text>
              )}
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.primary.main} />
          </TouchableOpacity>
        </View>
      )}

      {/* Notes */}
      {order.notes && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="note-text" size={20} color={colors.secondary.main} />
            <Text style={styles.sectionTitle}>Notas</Text>
          </View>
          <Text style={styles.notes}>{order.notes}</Text>
        </View>
      )}

      {/* Items */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="food" size={20} color={colors.primary.main} />
          <Text style={styles.sectionTitle}>Productos</Text>
        </View>
        <View style={styles.itemsContainer}>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemQuantity}>{item.quantity} x </Text>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemPrice}>{Number(item.lineTotal).toFixed(2)}€</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>{Number(order.total).toFixed(2)}€</Text>
      </View>

      {/* Action Button */}
      {buttonConfig && (
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: buttonConfig.backgroundColor }]} 
          onPress={onPress}
        >
          <MaterialCommunityIcons name={buttonConfig.icon} size={20} color="#fff" />
          <Text style={styles.actionButtonText}>{buttonConfig.text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
