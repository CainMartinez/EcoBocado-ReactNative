import React, { FC, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { styles } from '../../styles/components/ui/Card.styles';

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

export default Card;
