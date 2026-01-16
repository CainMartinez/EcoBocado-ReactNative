import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../../utils/theme';

export const styles = StyleSheet.create({
  button: {
    marginVertical: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contained: {
    backgroundColor: colors.primary.main,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  text: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  containedText: {
    color: '#FFFFFF',
  },
  outlinedText: {
    color: colors.primary.main,
  },
  textText: {
    color: colors.primary.main,
  },
});
