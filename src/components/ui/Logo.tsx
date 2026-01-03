import React, { FC } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
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
        <Text style={styles.title}>EcoBocado</Text>
      </View>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
    fontSize: typography.fontSizes.xxxl,
    fontWeight: '700',
    color: colors.primary.main,
  },
  subtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default Logo;
