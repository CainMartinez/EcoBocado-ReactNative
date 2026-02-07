import React from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Button } from '../../components/ui';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks';
import { useProfile } from '../../hooks/queries';
import { ProfileHeader, InfoItem } from '../../components/profile';
import { styles } from '../../styles/profile.styles';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { data: profile, isLoading, isError, error } = useProfile();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  // Mostrar indicador de carga mientras se obtienen los datos del perfil
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando perfil...</Text>
      </View>
    );
  }

  // Mostrar mensaje de error si falla la carga
  if (isError) {
    console.error('[ProfileScreen] Error al cargar perfil:', error);
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
          Error al cargar los datos del perfil
        </Text>
        <Text style={{ marginBottom: 20, textAlign: 'center', color: '#666' }}>
          {error instanceof Error ? error.message : 'Error desconocido'}
        </Text>
        <Button onPress={() => router.replace('/(auth)/login')}>
          Volver al inicio
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <ProfileHeader 
          name={profile?.name || user?.name || 'Usuario'} 
          email={profile?.email || user?.email || ''} 
          avatarUrl={profile?.avatarUrl}
        />

        <InfoItem
          icon="car"
          label="Tipo de vehículo"
          value={'Motocicleta' /*user?.vehicleType || 'No especificado'*/}
        />
        <InfoItem
          icon="card-text"
          label="Matrícula"
          value={user?.vehiclePlate || 'No especificado'}
        />
        <InfoItem
          icon="phone"
          label="Teléfono"
          value={user?.phone || 'No especificado'}
        />
        <InfoItem
          icon="check-circle"
          label="Estado"
          value={user?.isAvailable ? 'Disponible' : 'No disponible'}
        />

        <View style={{ padding: 20 }}>
          <Button mode="outlined" onPress={handleLogout}>
            Cerrar sesión
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
