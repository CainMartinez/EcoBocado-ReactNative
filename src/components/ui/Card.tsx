import React, { FC, ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';
import { spacing, borderRadius, shadows } from '../../utils/theme';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

const Card: FC<CardProps> = ({ children, style, elevation = 4 }) => {
  return (
    <Surface 
      style={[styles.card, shadows.medium, style]} 
      elevation={elevation}
    >
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.xl,
    borderRadius: borderRadius.large,
  },
});

export default Card;
