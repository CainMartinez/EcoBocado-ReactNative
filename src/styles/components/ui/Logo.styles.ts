import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../../utils/theme';

export const styles = StyleSheet.create({
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
