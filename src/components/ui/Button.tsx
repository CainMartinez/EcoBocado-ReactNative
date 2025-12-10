import React, { FC, ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';
import { spacing } from '../../utils/theme';

interface ButtonProps extends Omit<PaperButtonProps, 'children'> {
  children: ReactNode;
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

const Button: FC<ButtonProps> = ({ 
  children, 
  onPress, 
  mode = 'contained', 
  style,
  contentStyle,
  disabled = false,
  loading = false,
  icon,
  ...props 
}) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={[styles.button, style]}
      contentStyle={[styles.buttonContent, contentStyle]}
      disabled={disabled}
      loading={loading}
      icon={icon}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: spacing.sm,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
});

export default Button;
