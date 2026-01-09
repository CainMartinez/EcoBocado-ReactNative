import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '../../utils/theme';
import { useAuth } from '../../hooks';
import { statsService, DeliveryStats } from '../../services/statsService';

export default function HomeScreen() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DeliveryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await statsService.getDeliveryStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading && !stats) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Estado actual */}
          <View style={[styles.card, styles.highlightCard]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="clock-fast" size={28} color="#fff" />
              <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, styles.whiteText]}>En Este Momento</Text>
                <Text style={[styles.cardSubtitle, styles.whiteText]}>
                  {stats?.todayInProgress || 0} pedido{(stats?.todayInProgress || 0) !== 1 ? 's' : ''} en marcha
                </Text>
              </View>
            </View>
            {(stats?.todayPending || 0) > 0 && (
              <Text style={[styles.pendingText, styles.whiteText]}>
                +{stats?.todayPending} pendiente{(stats?.todayPending || 0) !== 1 ? 's' : ''} por recoger
              </Text>
            )}
          </View>

          {/* Rendimiento hoy */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="trending-up" size={24} color="#4CAF50" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Rendimiento Hoy</Text>
                <Text style={styles.cardSubtitle}>
                  {stats?.todayCompleted || 0} completados de {(stats?.todayCompleted || 0) + (stats?.todayInProgress || 0) + (stats?.todayPending || 0)} totales
                </Text>
              </View>
            </View>
          </View>

          {/* Progreso semanal */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="calendar-week" size={24} color="#2196F3" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Esta Semana</Text>
                <Text style={styles.cardSubtitle}>
                  {stats?.weekCompleted || 0} pedidos • Promedio {((stats?.weekCompleted || 0) / 7).toFixed(1)}/día
                </Text>
              </View>
            </View>
          </View>

          {/* Ingresos mensuales */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#4CAF50" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Ingresos del Mes</Text>
                <Text style={styles.cardSubtitle}>
                  €{Number(stats?.totalRevenue || 0).toFixed(2)} • {stats?.monthCompleted || 0} entregas
                </Text>
              </View>
            </View>
          </View>

          {/* Trayectoria */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="trophy" size={24} color="#FFD700" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Tu Trayectoria</Text>
                <Text style={styles.cardSubtitle}>
                  {stats?.totalCompleted || 0} entregas exitosas acumuladas
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightCard: {
    backgroundColor: colors.primary.main as string,
    shadowColor: colors.primary.main as string,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: spacing.md,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  whiteText: {
    color: '#fff',
  },
  pendingText: {
    fontSize: 13,
    marginTop: spacing.sm,
    marginLeft: 40,
    opacity: 0.9,
  },
});
