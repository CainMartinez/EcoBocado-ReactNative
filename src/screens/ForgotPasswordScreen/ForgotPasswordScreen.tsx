import React, { FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo, Card, Button } from '../../components/ui';
import Dialog from '../../components/ui/Dialog';
import Input from '../../components/ui/Input';
import { ScreenProps } from '../../navigation/types';
import { colors, spacing } from '../../utils/theme';

const ForgotPasswordScreen: FC<ScreenProps<'ForgotPassword'>> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    navigation.goBack();
  };

  const handleSubmit = (): void => {
    if (!email) {
      return;
    }
    showDialog();
  };

  return (
    <View style={styles.container}>
      <Card>
        <Logo subtitle="Recuperar contraseña" />
        
        <Text style={styles.description}>
          Introduce tu correo electrónico de repartidor. El gerente recibirá tu solicitud
          y te contactará para restablecer tu contraseña.
        </Text>

        <Input
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button mode="contained" onPress={handleSubmit}>
          Enviar solicitud
        </Button>

        <Button mode="text" onPress={() => navigation.goBack()}>
          Volver al login
        </Button>
      </Card>

      <Dialog 
        visible={visible} 
        onDismiss={hideDialog}
        title="Solicitud enviada"
        actions={
          <Button onPress={hideDialog}>Entendido</Button>
        }
      >
        <Text style={styles.dialogText}>
          Tu solicitud ha sido enviada al gerente. Recibirás un correo con 
          instrucciones para restablecer tu contraseña.
        </Text>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.default,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  dialogText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
});

export default ForgotPasswordScreen;
