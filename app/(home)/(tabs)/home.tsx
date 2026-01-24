import { SignOutButton } from "@/components/SignOutButton";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
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

  const convexUser = useQuery(
    api.functions.user.getUser,
    user ? { userId: user?.id } : "skip",
  );

  return (
    <SafeAreaView>
      <Text>home</Text>
      <Text>{user?.id}</Text>
      <Text>hello {user?.firstName}</Text>
      <Text>Age: {convexUser?.age}</Text>
      <Text>First Name: {convexUser?.firstName}</Text>
      <Text>Last Name: {convexUser?.lastName}</Text>
      <Text>Goal: {convexUser?.goal}</Text>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default Home;
