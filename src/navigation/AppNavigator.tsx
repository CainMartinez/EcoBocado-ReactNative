import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { colors } from '../utils/theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary.main,
        },
        headerTintColor: colors.neutral.white,
        headerTitleStyle: {
          fontWeight: '600',
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{ 
          title: 'Recuperar contraseña',
          headerShown: true 
        }}
      />
      
      {/* Pantallas futuras del repartidor */}
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      {/* <Stack.Screen name="DeliveryList" component={DeliveryListScreen} /> */}
      {/* <Stack.Screen name="DeliveryDetail" component={DeliveryDetailScreen} /> */}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
