import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '../../components/ui';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks';
import { styles } from '../../styles/profile.styles';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.name}>
            {user?.name || 'Usuario'}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del vehículo</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Tipo de vehículo</Text>
            <Text style={styles.infoValue}>{user?.vehicleType || 'No especificado'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Placa</Text>
            <Text style={styles.infoValue}>{user?.vehiclePlate || 'No especificado'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>{user?.phone || 'No especificado'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Estado</Text>
            <Text style={styles.infoValue}>
              {user?.isAvailable ? 'Disponible' : 'No disponible'}
            </Text>
          </View>
        </View>

        <Button mode="outlined" onPress={handleLogout}>
          Cerrar sesión
        </Button>
      </ScrollView>
    </View>
  );
}
