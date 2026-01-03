import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../utils/theme';

export default function DeliveriesScreen() {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.default }]}>
      <View style={styles.container}>
        <Text style={styles.header}>Entregas</Text>
        <ScrollView style={styles.content}>
          <Text style={styles.message}>No hay entregas pendientes</Text>
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
  message: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
