import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from '../ui/Input';
import { colors } from '../../utils/theme';

interface PasswordInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInput: FC<PasswordInputProps> = ({ 
  label = 'Contraseña', 
  value, 
  onChangeText, 
  ...props 
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      rightIcon={
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <MaterialCommunityIcons 
            name={secureTextEntry ? "eye" : "eye-off"} 
            size={24} 
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      }
      {...props}
    />
  );
};

export default PasswordInput;
