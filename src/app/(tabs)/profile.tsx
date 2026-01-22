import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '../../components/ui';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks';
import { ProfileHeader, InfoItem } from '../../components/profile';
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
        <ProfileHeader 
          name={user?.name || 'Usuario'} 
          email={user?.email || ''} 
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
