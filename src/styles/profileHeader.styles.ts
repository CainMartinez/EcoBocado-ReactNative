import { StyleSheet } from 'react-native';
import { colors, spacing } from '../utils/theme';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightGray,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});
