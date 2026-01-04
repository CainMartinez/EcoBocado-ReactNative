import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '../../utils/theme';
import { useAuthStore } from '../../store/authStore';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.default }]}>
      <View style={styles.container}>
        <Text style={styles.header}>Inicio</Text>
      
        <ScrollView style={styles.content}>
          <Text style={styles.greeting}>
            ¡Hola, {user?.name || 'Usuario'}! 👋
          </Text>
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="package-variant" size={24} color={colors.primary.main as string} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Entregas de Hoy</Text>
                <Text style={styles.cardSubtitle}>3 pendientes</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="map-marker-distance" size={24} color={colors.primary.main as string} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Kilómetros Recorridos</Text>
                <Text style={styles.cardSubtitle}>45.2 km esta semana</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="star" size={24} color={colors.primary.main as string} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Valoración</Text>
                <Text style={styles.cardSubtitle}>4.8 ⭐ (124 entregas)</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    padding: spacing.lg,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: spacing.lg,
    color: colors.text.primary,
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
});
