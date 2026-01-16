import React, { FC } from 'react';
import { View } from 'react-native';
import Input from '../ui/Input';
import PasswordInput from './PasswordInput';
import { Button } from '../ui';
import { styles } from '../../styles/components/auth/LoginForm.styles';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
  loading?: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  onSubmit,
  onForgotPassword,
  loading = false
}) => {
  return (
    <View style={styles.container}>
      <Input
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
      />

      <Button 
        mode="contained" 
        onPress={onSubmit}
        loading={loading}
      >
        Iniciar Sesión
      </Button>

      <Button 
        mode="text" 
        onPress={onForgotPassword}
      >
        ¿Olvidaste tu contraseña?
      </Button>
    </View>
  );
};

export default LoginForm;
