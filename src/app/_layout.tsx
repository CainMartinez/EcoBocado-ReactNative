import { Stack } from 'expo-router';
import { AuthProvider } from '../providers';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
