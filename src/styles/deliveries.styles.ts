import { StyleSheet, Platform } from 'react-native';
import { colors, spacing } from '../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  orderCard: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  orderAmount: {
    fontSize: 20,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.light,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLine1: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary.main,
    marginBottom: 2,
  },
  addressLine2: {
    fontSize: 13,
    color: colors.primary.main,
    marginBottom: 2,
  },
  addressCity: {
    fontSize: 13,
    color: colors.primary.main,
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.default,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  itemsContainer: {
    marginVertical: spacing.md,
    padding: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  item: {
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
    marginVertical: 2,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  totalValue: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  totalLabelBold: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  totalValueBold: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
});
