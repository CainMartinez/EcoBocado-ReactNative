import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo, Card, Button } from '../../components/ui';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/auth/PasswordInput';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../utils/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implementar login con Zustand
      console.log('Login attempt:', email);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.default }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Card>
              <Logo subtitle="Bienvenido de nuevo" />
              
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
                onPress={handleLogin}
                loading={loading}
              >
                Iniciar sesión
              </Button>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
});
