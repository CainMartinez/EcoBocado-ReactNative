import React, { FC } from 'react';
import { View, TextInput, Text, StyleProp, TextStyle } from 'react-native';
import { colors } from '../../utils/theme';
import { styles } from '../../styles/components/ui/Input.styles';

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
  error?: boolean;
  editable?: boolean;
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
  error = false,
  editable = true,
  ...props 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder || label}
          placeholderTextColor={colors.text.disabled}
          style={[styles.input, style]}
          editable={editable}
          {...props}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

export default Input;
