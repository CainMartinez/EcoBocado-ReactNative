import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Portal, Dialog, Paragraph } from 'react-native-paper';
import { Logo, Card, Button } from '../../components/ui';
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
        
        <Text variant="bodyMedium" style={styles.description}>
          Introduce tu correo electrónico de repartidor. El gerente recibirá tu solicitud
          y te contactará para restablecer tu contraseña.
        </Text>

        <Input
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          icon="email"
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

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Solicitud enviada</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Tu solicitud ha sido enviada al gerente. Recibirás un correo con 
              instrucciones para restablecer tu contraseña.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Entendido</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;
