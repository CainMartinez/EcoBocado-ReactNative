import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.paper,
    borderRadius: borderRadius.medium,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  highlightContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  highlight: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  pendingText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
