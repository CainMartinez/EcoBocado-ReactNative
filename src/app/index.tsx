import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Check auth state with Zustand
  const isAuthenticated = false;
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }
  
  return <Redirect href="/(auth)/login" />;
}
