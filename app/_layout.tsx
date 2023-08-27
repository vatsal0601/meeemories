import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider } from "react-query";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/nunito";

import { queryClient } from "../lib/query-client";
import { tokenCache } from "../lib/token-cache";

import Header from "../components/header";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const { isLoaded } = useAuth();

  const onLayoutRootView = React.useCallback(() => {
    if (!fontsLoaded || !isLoaded) return;

    SplashScreen.hideAsync();
  }, [fontsLoaded, isLoaded]);

  if (!fontsLoaded || !isLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ header: (props) => <Header {...props} /> }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="create-memory-modal"
            options={{ presentation: "modal", gestureEnabled: false }}
          />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

const Layout = () => (
  <>
    <StatusBar style="auto" />
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_KEY!}
      tokenCache={tokenCache}
    >
      <App />
    </ClerkProvider>
  </>
);

export default Layout;
