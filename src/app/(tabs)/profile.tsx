import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../utils/theme';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implementar logout con Zustand
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.default }]}>
      <View style={styles.container}>
        <Text style={styles.header}>Perfil</Text>
        <ScrollView style={styles.content}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>U</Text>
            </View>
            <Text style={styles.name}>Usuario</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuenta</Text>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Editar perfil</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>Configuración</Text>
            </View>
          </View>

          <Button mode="outlined" onPress={handleLogout}>
            Cerrar sesión
          </Button>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  menuText: {
    fontSize: 16,
    color: colors.text.primary,
  },
});
