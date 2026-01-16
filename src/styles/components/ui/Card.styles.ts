import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../../utils/theme';

export const styles = StyleSheet.create({
  card: {
    padding: spacing.xl,
    borderRadius: borderRadius.large,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
