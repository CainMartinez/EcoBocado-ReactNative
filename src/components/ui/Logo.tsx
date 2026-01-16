import React, { FC } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from '../../styles/components/ui/Logo.styles';

interface LogoProps {
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

const Logo: FC<LogoProps> = ({ subtitle, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoWrapper}>
        <Text style={styles.emoji}>🌿</Text>
        <Text style={styles.title}>EcoBocado</Text>
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

export default Logo;
