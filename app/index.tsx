import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait for Clerk to hydrate
  if (!isLoaded) return null;

  // Not logged in → sign in
  if (!isSignedIn) {
    return <Redirect href="/welcome-screen" />;
  }

  // Logged in → home
  return <Redirect href="/(home)/home" />;
}