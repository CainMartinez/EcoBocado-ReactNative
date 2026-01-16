import React, { FC, ReactNode } from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { colors } from '../../utils/theme';
import { styles } from '../../styles/components/ui/Button.styles';

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

export default Button;
