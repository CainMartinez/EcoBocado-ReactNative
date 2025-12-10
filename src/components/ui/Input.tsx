import React, { FC } from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { spacing } from '../../utils/theme';

interface InputProps extends Omit<TextInputProps, 'mode'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: string;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: StyleProp<TextStyle>;
}

const Input: FC<InputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  icon, 
  rightIcon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  ...props 
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
      left={icon ? <TextInput.Icon icon={icon} /> : null}
      right={rightIcon}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: spacing.md,
  },
});

export default Input;
