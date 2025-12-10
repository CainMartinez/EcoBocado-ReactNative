import React, { FC, useState } from 'react';
import { TextInput } from 'react-native-paper';
import Input from '../ui/Input';

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
      icon="lock"
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      rightIcon={
        <TextInput.Icon 
          icon={secureTextEntry ? "eye" : "eye-off"}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        />
      }
      {...props}
    />
  );
};

export default PasswordInput;
