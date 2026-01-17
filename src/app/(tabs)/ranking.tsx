import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { BlurView } from 'expo-blur';
import { getRanking } from '../../../src/services/rankingService';
import { RankingResponse, RankingEntry } from '../../../src/types';
import { styles } from '../../../src/styles/ranking.styles';

export default function RankingScreen() {
  const [ranking, setRanking] = useState<RankingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRanking = async () => {
    try {
      setError(null);
      const data = await getRanking();
      setRanking(data);
    } catch (err) {
      console.error('Error loading ranking:', err);
      setError('No se pudo cargar el ranking. Intenta de nuevo.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadRanking();
  };

  const getPositionBadgeStyle = (position: number) => {
    if (position === 1) return styles.topPositionBadge;
    if (position === 2) return styles.secondPositionBadge;
    if (position === 3) return styles.thirdPositionBadge;
    return {};
  };

  const getMonthName = (monthString: string) => {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  const renderRankingEntry = (entry: RankingEntry) => {
    const isAnonymous = !entry.isCurrentUser;

    return (
      <View
        key={entry.position}
        style={[
          styles.rankingCard,
          entry.isCurrentUser && styles.currentUserCard,
        ]}
      >
        <View style={styles.rankingCardContent}>
          {/* Position Badge */}
          <View style={[styles.positionBadge, getPositionBadgeStyle(entry.position)]}>
            <Text style={styles.positionText}>#{entry.position}</Text>
          </View>

          {/* Driver Info */}
          <View style={styles.driverInfo}>
            {isAnonymous ? (
              <BlurView intensity={80} style={{ borderRadius: 4 }}>
                <Text style={styles.anonymousName}>████████████</Text>
              </BlurView>
            ) : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.driverName}>{entry.driverName}</Text>
                <View style={styles.currentUserBadge}>
                  <Text style={styles.currentUserText}>TÚ</Text>
                </View>
              </View>
            )}
            <Text style={styles.deliveriesText}>
              {entry.monthlyDeliveries} {entry.monthlyDeliveries === 1 ? 'entrega' : 'entregas'}
            </Text>
          </View>

          {/* Deliveries Count */}
          <Text style={styles.deliveriesCount}>{entry.monthlyDeliveries}</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />
        }
      >
        {/* Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>🏆 Ranking de Repartidores</Text>
          <Text style={styles.headerSubtitle}>
            {ranking ? `${getMonthName(ranking.currentMonth)}` : 'Cargando...'}
          </Text>
          {ranking?.userPosition && (
            <Text style={styles.headerSubtitle}>
              Tu posición: #{ranking.userPosition}
            </Text>
          )}
          <View style={styles.bonusInfoCard}>
            <Text style={styles.bonusInfoIcon}>💰</Text>
            <Text style={styles.bonusInfoText}>
              El repartidor #1 del mes recibe una bonificación salarial
            </Text>
          </View>
        </View>

        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Ranking List */}
        {ranking && ranking.entries.length > 0 ? (
          ranking.entries.map(renderRankingEntry)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aún no hay datos de ranking para este mes.{'\n'}
              ¡Completa entregas para aparecer en el ranking!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
