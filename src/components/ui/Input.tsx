import React, { FC } from 'react';
import { View, TextInput, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { spacing, colors, borderRadius } from '../../utils/theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: StyleProp<TextStyle>;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  rightIcon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  placeholder,
  ...props 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder || label}
          placeholderTextColor={colors.text.disabled}
          style={[styles.input, style]}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.medium,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
  },
  rightIcon: {
    paddingRight: spacing.md,
  },
});

export default Input;
