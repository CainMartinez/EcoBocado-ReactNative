import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../utils/theme';
import { useAuth } from '../../hooks';
import { useProfile } from '../../hooks/queries';
import { styles } from '../../styles/components/shared/AppHeader.styles';

export default function AppHeader() {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.leftSection}>
        <Image 
          source={require('../../../assets/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.centerSection}>
        <Text style={styles.greeting}>Hola, {profile?.name || user?.name || 'Usuario'}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.avatarContainer}>
          {profile?.avatarUrl ? (
            <Image 
              source={{ uri: profile.avatarUrl }} 
              style={styles.avatarImage}
              resizeMode="cover"
            />
          ) : user?.name ? (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>U</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
