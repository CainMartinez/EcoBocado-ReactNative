import React from 'react';
import { View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { StatsCard } from '../../components/home';
import { useStats } from '../../hooks';
import { colors } from '../../utils/theme';
import { styles } from '../../styles/home.styles';

export default function HomeScreen() {
  const { stats, loading, refreshing, onRefresh } = useStats();

  if (loading && !stats) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
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
        <StatsCard
          icon="clock-fast"
          iconColor={colors.warning}
          title="En Este Momento"
          subtitle={`${stats?.todayInProgress || 0} pedido${(stats?.todayInProgress || 0) !== 1 ? 's' : ''} en marcha`}
          highlight={`${stats?.todayInProgress || 0}`}
          pendingText={(stats?.todayPending || 0) > 0 ? `+${stats?.todayPending} pendiente${(stats?.todayPending || 0) !== 1 ? 's' : ''}` : undefined}
        />

        <StatsCard
          icon="trending-up"
          iconColor={colors.success}
          title="Rendimiento Hoy"
          subtitle={`${stats?.todayCompleted || 0} completados de ${(stats?.todayCompleted || 0) + (stats?.todayInProgress || 0) + (stats?.todayPending || 0)} totales`}
          highlight={`${stats?.todayCompleted || 0}`}
        />

        <StatsCard
          icon="calendar-week"
          iconColor={colors.info}
          title="Esta Semana"
          subtitle={`${stats?.weekCompleted || 0} pedidos • Promedio ${((stats?.weekCompleted || 0) / 7).toFixed(1)}/día`}
          highlight={`${stats?.weekCompleted || 0}`}
        />

        <StatsCard
          icon="trophy"
          iconColor={colors.accent.purple}
          title="Tu Trayectoria"
          subtitle={`${stats?.totalCompleted || 0} entregas exitosas acumuladas`}
          highlight={`${stats?.totalCompleted || 0}`}
        />
      </ScrollView>
    </View>
  );
}
