import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import {
  Syne_400Regular,
  Syne_500Medium,
  Syne_600SemiBold,
  Syne_700Bold,
  Syne_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/syne";

import { DataProvider } from "./contexts/DataContext";

import Home from "./screens/home";
import Register from "./screens/register";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export type RootStackParamList = {
  Home: undefined;
  CreateMemory: { mode: "create" } | { mode: "edit"; id: string };
};

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Syne_400Regular,
    Syne_500Medium,
    Syne_600SemiBold,
    Syne_700Bold,
    Syne_800ExtraBold,
  });

  const { isLoaded } = useAuth();

  const onLayoutRootView = React.useCallback(async () => {
    if (!fontsLoaded || !isLoaded) return;
    await SplashScreen.hideAsync();
  }, [fontsLoaded, isLoaded]);

  if (!fontsLoaded || !isLoaded) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <SignedIn>
        <DataProvider>
          <Home />
        </DataProvider>
      </SignedIn>
      <SignedOut>
        <Register />
      </SignedOut>
    </SafeAreaProvider>
  );
};

const Wrapper = () => (
  <>
    <StatusBar style="auto" />
    <ClerkProvider
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
      tokenCache={tokenCache}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </ClerkProvider>
  </>
);

export default Wrapper;
