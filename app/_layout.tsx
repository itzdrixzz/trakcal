import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import "../i18n";

import "../global.css";
import i18n from "../i18n";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ConvexProvider client={convex}>
        <ClerkProvider tokenCache={tokenCache}>
          <Stack screenOptions={{ headerShown: false }} />
        </ClerkProvider>
      </ConvexProvider>
    </I18nextProvider>
  );
}
