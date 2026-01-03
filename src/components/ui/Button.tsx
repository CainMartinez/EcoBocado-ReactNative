import React, { FC, ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { spacing, colors, borderRadius } from '../../utils/theme';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ 
  children, 
  onPress, 
  mode = 'contained', 
  style,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        mode === 'contained' && styles.contained,
        mode === 'outlined' && styles.outlined,
        mode === 'text' && styles.text,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={mode === 'contained' ? '#FFFFFF' : colors.primary.main} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            mode === 'contained' && styles.containedText,
            mode === 'outlined' && styles.outlinedText,
            mode === 'text' && styles.textText,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default Button;
