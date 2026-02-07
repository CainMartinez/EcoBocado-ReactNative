import { Stack } from 'expo-router';
import { AuthProvider, QueryProvider } from '../providers';

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </QueryProvider>
  );
}
