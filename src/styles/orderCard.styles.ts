import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../utils/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.paper,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightGray,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.medium,
  },
  statusText: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 28,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLine: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  notes: {
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginLeft: 28,
  },
  itemsContainer: {
    marginLeft: 28,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
    minWidth: 40,
  },
  itemName: {
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lightGray,
    marginBottom: spacing.md,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary.main,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: borderRadius.small,
    gap: spacing.sm,
  },
  actionButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
});
