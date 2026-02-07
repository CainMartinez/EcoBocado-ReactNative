import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../utils/theme';
import { styles } from '../../styles/profileHeader.styles';
import { AvatarUpload } from './AvatarUpload';

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export function ProfileHeader({ name, email, avatarUrl }: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <AvatarUpload currentAvatarUrl={avatarUrl} size={80} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}
