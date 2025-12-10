import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Definición de las rutas de la app para repartidor
export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  DeliveryList: undefined;
  DeliveryDetail: { deliveryId: string };
  Profile: undefined;
};

// Tipos de navegación para usar en los componentes
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// Props para screens que reciben navegación
export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};
