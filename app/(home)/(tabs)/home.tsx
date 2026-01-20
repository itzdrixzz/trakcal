import { SignOutButton } from "@/components/SignOutButton";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      router.replace("/(auth)/welcome-screen");
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <SafeAreaView>
      <Text>home</Text>
      <Text>{user?.id}</Text>
      <Text>hello {user?.firstName}</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default Home;
