import React, { FC, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Logo, Card } from '../../components/ui';
import { LoginForm } from '../../components/auth';
import { loginStyles } from './styles';
import { ScreenProps } from '../../navigation/types';

const LoginScreen: FC<ScreenProps<'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (): void => {
    setLoading(true);
    // Implementar lógica de login
    console.log('Login attempt with:', email);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleForgotPassword = (): void => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}
    >
      <Card>
        <Logo subtitle="Bienvenido de nuevo" />
        
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
          loading={loading}
        />
      </Card>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
