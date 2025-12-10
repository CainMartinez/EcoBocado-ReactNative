import React, { FC } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing, typography } from '../../utils/theme';

interface LogoProps {
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
}

const Logo: FC<LogoProps> = ({ subtitle, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoWrapper}>
        <Text style={styles.emoji}>🌿</Text>
        <Text variant="headlineLarge" style={styles.title}>
          EcoBocado
        </Text>
      </View>
      {subtitle && (
        <Text variant="bodyLarge" style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emoji: {
    fontSize: typography.fontSizes.xxl,
    marginRight: spacing.sm,
  },
  title: {
    fontWeight: '700' as const,
    color: colors.primary.main,
  },
  subtitle: {
    color: colors.text.secondary,
    textAlign: 'center' as const,
  },
});

export default Logo;
