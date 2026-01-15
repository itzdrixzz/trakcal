import { SignOutButton } from '@/components/SignOutButton';
import { useUser } from '@clerk/clerk-expo';
import { Redirect, router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
   
type publicMetadata = {
  hasCompletedOnboarding?: boolean;
};

const Onboarding = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  React.useEffect(() => {
    if (user) {
      user.reload();
    }
  }, [user]);

  if (!isSignedIn || !user) return <Redirect href="/welcome-screen" />;

  if (user.publicMetadata.hasCompletedOnboarding){
    router.replace('/(home)/home')
  }

  if (!isLoaded) return <Text>Loading...</Text>;
  
  return (
    <SafeAreaView>
      <Text>Onboarding</Text>
      <Text className="text-black">{JSON.stringify(user.publicMetadata.hasCompletedOnboarding)}</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default Onboarding