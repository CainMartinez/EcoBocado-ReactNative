import React, { FC, ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { spacing, borderRadius, shadows } from '../../utils/theme';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Card: FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Card;
